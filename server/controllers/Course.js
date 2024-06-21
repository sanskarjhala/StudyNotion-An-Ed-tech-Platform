const Course = require("../models/Course");
// const Tag = require('../models/Tag');//!!!!!!!!!!!! YEAH CHECK KRNA HAI !!!!!!!!!!!!!!!!!!`
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create course handler
exports.createCourse = async (req, res) => {
  try {
    //fetch data
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category,
      status,
      instructions,
      tag,
    } = req.body; //tag => is representing the id

    //fetch image file
    // const thumbnail = req.files.thumbnailImage;

    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      // !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (!status || status === undefined) {
      status = "Draft";
    }

    //instructor details or we can say valid instructor
    const userId = req.user.id; //from payload
    const instructorDeatils = await User.findById(userId, {
      accountType: "Instructor",
    });

    console.log("Instructor Details -> ", instructorDeatils);
    //TODO: Verify that userId and instructorDetails._id  are same or different ?

    if (!instructorDeatils) {
      return res.status(404).json({
        success: false,
        message: "Instrustor Deatils Not Found",
      });
    }

    console.log("Yaha aa kar faat gaaye gaaye sirrrrr");
    //tag validation check
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category deatils not Found",
      });
    }

    //image upload to cludinary
    // const cloudinaryResponse = await uploadImageToCloudinary(
    //   thumbnail,
    //   process.env.FOLDER_NAME
    // );

    //create entry in database
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDeatils._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      // tag: tag,
      category: categoryDetails._id,
      status: status,
      instructions: instructions,
      // thumbnail: cloudinaryResponse.secure_url,
    });

    //update User (instructor) updating the new course to user schema
    await User.findByIdAndUpdate(
      { _id: instructorDeatils._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // Add the new course to the Categories
    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    );

    //return response
    return res.status(200).json({
      success: true,
      message: "Course Created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create a course, please try again",
    });
  }
};

//getallcourse handler
exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        RatingAndReview: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "All course fetched Successfully",
      data: allCourses,
    });
  } catch (error) {
    console.error(erro);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch the data of courses",
    });
  }
};

// !!!!!!!!!!!!!!!!!! Want to Check !!!!!!!!!!!!!!!!!!!!!!!
//get course Details

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const courseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("RatingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    console.log("Course Found");
    return res.status(200).json({
      sucess: true,
      message: "Succesfully fetched the Specific Course Details",
      details: courseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to get Course Details",
    });
  }
};
