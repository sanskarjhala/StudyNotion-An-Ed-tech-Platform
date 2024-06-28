const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

//create section handler
exports.createSection = async (req, res) => {
  try {
    //data fetch from body
    const { sectionName, courseId } = req.body;

    //perform validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing deatils/Properties",
      });
    }

    //create section
    const newSection = await Section.create({ sectionName });

    //update course details schema
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    //return response
    console.log("UPDATED COURSE DETAILS ", updatedCourseDetails);
    return res.status(200).json({
      success: true,
      message: "Course-section created succefully",
      updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create the course , please try again later",
      error: error.message,
    });
  }
};

//update section handler
exports.updateSection = async (req, res) => {
  try {
    //data fetch from request body
    const { sectionName, sectionId, courseId } = req.body;

    //validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing properties",
      });
    }

    //update section data
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName }, //yeah check krna hai sir ne sirf direct sectionName update krva diya hai
      { new: true }
    );

    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    //return response
    return res.status(200).json({
      success: true,
      message: "Section Updated Successfully",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update the section",
      error: error.message,
    });
  }
};

//delete section handler
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        courseContent: sectionId,
      },
    });

    const section = await Section.findById(sectionId);
    console.log(sectionId, courseId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section Not Found",
      });
    }

    //deleting subSection
    await SubSection.deleteMany({ _id: { $in: section.subSection } });

    await Section.findByIdAndDelete(sectionId);

    //find the updated course and return
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    //return successfull response
    return res.status(200).json({
      success: true,
      message: "Section Deleted Sucessfully",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete the section",
      error: error.message,
    });
  }
};
