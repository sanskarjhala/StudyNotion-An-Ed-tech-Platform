const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const Profile = require("../models/Profile");
require("dotenv").config();

//send OTP
exports.sendOTP = async (req, res) => {
  try {
    //fecth email from email ki body
    const { email } = req.body;

    //check if user alredy exist
    const checkUserPresent = await User.findOne({ email });

    //if user already exit , then return response
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already exist",
      });
    }

    //generate OTP
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP generated: ", otp);

    //check unique otp or not
    let result = await OTP.findOne({ otp: otp });
    console.log("Result is Generate OTP Func");
    console.log("OTP", otp);
    console.log("Result", result);

    while (result) {
      otp = otpGenerator(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };

    //create an entry in database for otp
    const otpBody = await OTP.create(otpPayload); //yeah check krnma hai
    console.log(otpBody);

    //return response successfully
    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//signUp
exports.signUp = async (req, res) => {
  try {
    //data fetch from request ki body
    const {
      firstName,
      lastname,
      email,
      password,
      contactNumber,
      confirmPassword,
      accountType,
      otp,
    } = req.body;

    console.log(" details "  ,   firstName,
    lastname,
    email,
    password,
    confirmPassword,
    accountType,
    otp)

    //validation krlo
    if (
      !firstName ||
      !lastname ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp ||
      !accountType
    ) {
      return res.status(403).json({
        success: false,
        message: "all fields are required",
      });
    }

    //2 password match krlo
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "PAssword and confirm PAssword doesn't match, please try again ",
      });
    }
    //check user already exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already Exist",
      });
    }

    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(response);
    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user !!!!!!!!!HAVE TO CHECK THIS !!!!!!!!!!!!!!
    let approved = "";
    approved === "Instructor" ? (approved = false) : (approved = true);

    // create entry in database
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      contactNumber: null,
      about: null,
    });

    
    console.log("profile created " , profileDetails)
    const user = await User.create({
      firstName,
      lastname,
      email,
      // contactNumber,
      accountType: accountType,
      password: hashedPassword,
      approved: approved,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastname}`,
    });
    console.log("user created ")

    // return response successfully/
    return res.status(200).json({
      success: true,
      user,
      message: "User is registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user not registered, please try again ",
    });
  }
};

//Login
exports.login = async (req, res) => {
  try {
    //get data from request ki body
    const { email, password } = req.body;

    //validation of data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required , please try again",
      });
    }
    //user check exist or not
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "please sign up first ",
      });
    }
    //token generate JWT,after matching password
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType, //!!!!!!!!!HERE ROLE IS PASS CHECK THIS !!!!!!!!!
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      user.token = token;
      user.password = undefined;

      //create cookie and response send

      res
        .cookie("token", token, {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        })
        .status(200)
        .json({
          success: true,
          token,
          user,
          message: "user logged in successfully",
        });
    } else {
      return res.status(401).json({
        success: false,
        message: "password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "login failure , please try again ",
    });
  }
};

//changePassword handler to change the password 
exports.changePassword = async (req, res) => {
  try {
    //fetch user id 
    const userDeatils = await User.findById(req.user.id);
    const {oldPassword, newPassword,confirmPassword} = req.body;
    //check user valid id or not 
    if(!userDeatils){
      return res.status(404).json(
        {
          success:false,
          message:"USer not Found",
        }
      )
    }
    //check oldPassword valid or not 
    const isPasswordMatch = bcrypt.compare(oldPassword,userDeatils.password);
    // password not match
    if(!isPasswordMatch){
      return res.status(401).json(
        {
          success:false,
          message:"the password is incorrect",
        }
      )
    }
  //newPasswrod nad confirmPassword
  if(newPassword !== confirmPassword){
    return res.status(400).json(
      {
        success:false,
        message:"newPasswrod and confirm password does not match",
      }
    )
  }

  //update user details 
  const encryptedPassword = await bcrypt.hash(newPassword,10);
  const updatedUserDeatils = await User.findByIdAndUpdate(
    req.user.id,
    {password:encryptedPassword},
    {new:true},
  );

  //send notification Email
  try {
    const emailResponse = await mailSender(
      updatedUserDeatils.email,
      passwordUpdated(
        updatedUserDeatils.email,
        `Password updated successfully for ${updatedUserDeatils.firstName} ${updatedUserDeatils.lastname}`
      )
    );
    console.log(" Email send Succesfully " , emailResponse.response);
    
  } catch (error) {
    console.log("Error occured whhile sending email " , error);
    return res.status(500).json(
      {
        success:false,
        message:"Error while sending notification email",
        error:error.message,
      }
    )
  }

  //return succesfull response
  return res.status(200).json(
    {
      success:true,
      message:"Password updated successfully",
      updatedUserDeatils,
    }
  )
    
  } catch (error) {
    console.log("Error occured while updateing the password");
    return res.status(500).json(
      {
        success:false,
        message:"Unable to update the password",
        error:error.message,
      }
    )
  }
};
