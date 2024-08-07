const express = require("express");
const router = express.Router();

//import controller

//course constroller
const {
  createCourse,
  showAllCourses,
  getCourseDetails,
  editCourse,
  getFullCourseDetails,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/Course");

//category controller
const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../controllers/Category");

//section constroller
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

//sub-section constroller
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

//rating and review controllers
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

//importing middlewares
const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");

const { updateCourseProgress } = require("../controllers/CourseProgress");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

//course can only be created by instructor
router.post("/createCourse", auth, isInstructor, createCourse);
//Add a section to course
router.post("/addSection", auth, isInstructor, createSection);
//update a section
router.post("/updateSection", auth, isInstructor, updateSection);
//delete a section
router.post("/deleteSection", auth, isInstructor, deleteSection);
//update a sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
//delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
//add a sub section
router.post("/addSubSection", auth, isInstructor, createSubSection);
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse);
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
//get all resgistered courses
router.get("/getAllCourses", showAllCourses);
//get details for specific course
router.post("/getCourseDetails", getCourseDetails);
// Delete a Course
router.delete("/deleteCourse", deleteCourse);
// update course progress
router.post("/updateCourseProgress",auth,isStudent, updateCourseProgress);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;
