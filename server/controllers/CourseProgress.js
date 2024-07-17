const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  const userId = req.user.id;
  try {
    //check the subSection is valid or not
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "Sub-Section not found",
      });
    }

    //check for old entry
    let courseProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });

    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course-progress Does not exist",
      });
    } else {
      //check for re-completing video/subSection
      if (courseProgress?.completedVideo.includes(subSectionId)) {
        return res.status(403).json({
          success: false,
          error: "Sub-Section already completed",
        });
      }

      //push the completed video
      courseProgress.completedVideo.push(subSectionId);
    }

    await courseProgress.save();


    return res.status(200).json(
        {
            success:false,
            message:"Course Progress updated",
        }
    )
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};
