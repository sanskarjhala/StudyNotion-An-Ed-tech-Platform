const express = require("express")
const router = express.Router()
const { auth } = require("../middlewares/auth")
const {
    deleteAccount,
    upadteProfile,
    getAllUserDetails,
    updatedDisplayPicture,
    getEnrolledCourse
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

module.exports = router