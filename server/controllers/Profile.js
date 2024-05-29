const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//update User profile handler
//!!!!!!!!!!!!!!!!!!!GENDER HAS TO BE CHECK HERE !!!!!!!!!!!!!
exports.upadteProfile = async (req, res) => {
  try {
    //fetch data from request body
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;

    //get user id
    const userId = req.user.id;

    //perform validation
    if (!contactNumber || !userId || !gender) {
      return res.status(400).json({
        success: false,
        message: "All fileds are required",
      });
    }

    //find profile
    const userDeatils = await User.findById(userId);
    const profileId = userDeatils.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    //update profile
    profileDetails.dateOfBirth = dateOfBirth;
    (profileDetails.about = about),
      (profileDetails.contactNumber = contactNumber),
      (profileDetails.gender = gender),
      await profileDetails.save();

    //return response
    return res.status(200).json({
      success: false,
      message: "profile updated succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update the profile, please try again",
      error: error.message,
    });
  }
};

//delete acoount handler
//Explore -> how can we schedule this deletion operation
exports.deleteAccount = async (req, res) => {
  try {
    //get user id
    const userId = req.user.id;

    //perform validation
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //delete the profile
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
    //HW: unenrolled student from all the courses
    //delete user
    await User.findByIdAndDelete({ _id: userId });

    //return response
    return res.status(200).json({
      success: true,
      message: "User deletedd sucessfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete the account",
    });
  }
};

//getAllUserHandler
exports.getAllUserDetails = async (req, res) => {
  try {
    //get user id
    const userId = req.user.id;
    //validation
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    //get user data
    const userDeatils = await User.findById(userId)
      .populate("additionalDetails")
      .exec();

    //return response
    return res.status(200).json({
      success: true,
      message: "All details of USer fetched Successfully",
      userDeatils,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to get all details of user",
      error: error.message,
    });
  }
};

//updateDisplayPicture
exports.updatedDisplayPicture = async (req, res) => {
  try {
    console.log("Entered updated display picture route")
    console.log("user id" , req.user.id);
    const userId = req.user.id;
    console.log("Display picture " , req.files.displayPicture)
    const displayPicture = req.files.displayPicture;
    
    console.log("Display picture " , displayPicture , " userID " , userId)
    const uploadImageResponse = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(uploadImageResponse);

    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: uploadImageResponse.secure_url },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Displaypicture uploaded succesfully",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "unable to update the display picture",
      error: error.message,
    });
  }
};

//handler for fetching enrooled courses
exports.getEnrolledCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({ _id: userId })
      .populate("courses")
      .exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User details not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Succesfully fetche enrolled courses",
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch the enrooled courses",
      error: error.message,
    });
  }
};
