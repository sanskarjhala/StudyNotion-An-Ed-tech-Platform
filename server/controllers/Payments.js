const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");

//initiate the razorpay order
exports.capturepayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;

  if (courses.length === 0) {
    return res.status(403).json({
      success: false,
      message: "Not provided any course",
    });
  }

  let totalAmount = 0;

  //calculating total amount
  for (const course_id of courses) {
    let course;
    try {
      course = await Course.findById(course_id);

      if (!course) {
        return res.status(200).json({
          success: false,
          message: "Could not find the course",
        });
      }

      //if user already purchased the course
      const uid = userId;
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(200).json({
          success: false,
          message: "Student is already enrolled",
        });
      }
      totalAmount += course.price;
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    const paymentResponse = await instance.orders.create(options);

    res.json({
      success: true,
      message: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not initiate the payment",
    });
  }
};

//function to enroll the students
const enrolledStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(403).json({
      success: false,
      message: "courses and user-id not found",
    });
  }

  for (const courseId of courses) {
    try {
      //find the course and enroll the student
      const enrolledCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      //find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        { $push: { courses: courseId } },
        { new: true }
      );

      //send mail to the student
      const mailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName}`
        )
      );

      console.log("Email Sent Sucessully ", mailResponse);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

//for verifying the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;

  const courses = req.body?.courses;
  const userId = req.user.id;

  //validation
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(403).json({
      success: false,
      message: "Payment failed, all fileds are not provided ",
    });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    //exroll the student
    await enrolledStudents(courses, userId, res);
    //return response
    return res.status(200).json({
      success: true,
      message: "Payment verified",
    });
  }

  return res.status(403).json({
    success: false,
    message: "Payment fail",
  });
};


exports.sendSuccessfullPaymentEmail = async(req,res) => {
    const {orderId , paymentId , amount} = req.body;

    console.log("ORDER_ID " , orderId , "PAYMENT-ID" , paymentId , "AMOUNT" , amount);
    const userId = req.user.id;

    if(!orderId || !paymentId || !amount){
        return res.status(403).json(
            {
                success:false,
                message:" Please Provide All fields"
            }
        )
    }

    try {
        //find the student
        const enrolledStudent = await User.findById(userId);

        if(!enrolledStudent) { 
            return res.status(404).json(
                {
                    success:false,
                    message:"Student-Id not found"
                }
            )
        }

        await mailSender(enrolledStudent.email , `Payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName}` , amount/100 , orderId , paymentId)

        )

    } catch (error) {
        console.log("ERROR WHILE SENDING MAIL........." , error)
        return res.status(500).json(
            {
                success:false,
                message:"Could not send the email"
            }
        )
    }
}

// //capture the payment and initaite the Razorpay order
// exports.capturePayment = async(req, res) => {

//     //fetch course-id and user-id
//     const {course_Id} = req.body
//     const userId = req.user.id;

//     if(!course_Id){
//         return res.json(
//             {
//                 success:false,
//                 message:"Please provide valid course ID ",
//             }
//         )
//     }

//     //validation for course details
//     let courseDetils;
//     try {
//         courseDetils = await Course.findById(course_Id);
//         if(!courseDetils){
//             return res.status(404).json(
//                 {
//                     success:false,
//                     message:"course not found",
//                 }
//             )
//         }

//         let uid = new mongoose.Types.ObjectId(userId);  //!!!!!!!!!!!!!!!!!!!! CHECK THIS !!!!!!!!!!!!!!!!!!!
//         if(courseDetils.studentsEnrolled.includes(uid)){
//             return res.json(
//                 {
//                     success:false,
//                     message:"Student is already enrolled",
//                 }
//             )
//         }

//     } catch (error) {
//         return res.status(500).json(
//             {
//                 success:true,
//                 message:"Failed to fetch the course details",
//                 error:error.message,
//             }
//         )
//     }

//     //order create
//     const amount = courseDetils.price;
//     const currency = "INR";
//     const options = {
//         amount:amount*100,
//         currency:currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             courseId:course_Id,
//             userId,
//         }
//     }

//     try {
//         const razorpayResponse = await instance.orders.create(options);
//         console.log("RAZORPAY RESPONSE -> ", razorpayResponse);

//         return res.status(200).json({
//             success:true,
//             courseName:courseDetils.courseName,
//             courseDescription:courseDetils.courseDescription,
//             thumbnail: courseDetils.thumbnail,
//             orderId: razorpayResponse.id,
//             currency:razorpayResponse.currency,
//             amount:razorpayResponse.amount,
//         });

//     } catch (error) {
//         return res.status(500).json(
//             {
//                 success:false,
//                 message:"Failed to create the order",
//                 error:error.message,
//             }
//         )

//     }
// }

// //verify the signature of Razorpay
// exports.verifySignature = async(req,res) => {
//     const webhookSecret = "12345";
//     const signature = req.headers["x-razorpay-signature"];

//     const shasum =  crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest){
//         console.log("Payment authorized")

//         try{
//             const {courseId , userId} = req.body.payload.payment.entity.notes;

//             const enrolledCourse = await Course.findOneAndUpdate(
//                 {_id:courseId},
//                 {$push:{
//                     studentsEnrolled:userId
//                 }},
//                 {new:true}
//             )

//             if(!enrolledCourse){
//                 return res.status(404).json(
//                     {
//                         success:false,
//                         message:"Course not found",
//                     }
//                 )
//             }

//             const enrolledStudent = await User.findOneAndUpdate(
//                 {_id:userId},
//                 {$push:{
//                     courses:courseId
//                 }},
//                 {new:true},
//             )

//             console.log("Enrolled Student -> " , enrolledStudent);

//             const mailResponse = await mailSender(enrolledStudent.email,
//                 "Congratulations from CodeHelp",
//                 "Congratulations, you are onboarded into new CodeHelp Course"
//             )

//             console.log("Email-response-> ", mailResponse);

//             return res.status(200).json(
//                 {
//                     success:true,
//                     message:"Signature Verified and Course Added",
//                 }
//             )

//         } catch(error){
//             return res.status(500).json(
//                 {
//                     sucess:false,
//                     message:"Something went wrong while full-filling the action"
//                 }
//             )
//         }
//     }
//     else{
//         return res.status(400).json(
//             {
//                 success:false,
//                 message:"Invalid request",
//             }
//         )
//     }
// }
