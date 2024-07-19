const express = require("express")
const router = express.Router()
const { auth, isInstructor } = require("../middlewares/auth")
const {
    deleteAccount,
    upadteProfile,
    getAllUserDetails,
    updatedDisplayPicture,
    getEnrolledCourse,
    instructorDashboard
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, upadteProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourse)
router.put("/updateDisplayPicture", auth, updatedDisplayPicture)
router.get("/instructorDashboard" , auth , isInstructor , instructorDashboard)

module.exports = router