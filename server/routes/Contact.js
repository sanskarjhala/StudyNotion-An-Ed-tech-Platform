const express = require("express");
const router = express.Router();

const { contactUsMail } = require("../controllers/ContactUs");


//Route for sending Contact us Mail
router.post("/contact-us", contactUsMail);

module.exports = router