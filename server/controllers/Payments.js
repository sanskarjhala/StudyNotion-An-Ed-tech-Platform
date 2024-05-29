const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');
const { default: mongoose } = require('mongoose');


//capture the payment and initaite the Razorpay order 
exports.capturePayment = async(req, res) => { 

    //fetch course-id and user-id
    const {course_Id} = req.body 
    const userId = req.user.id;

    if(!course_Id){
        return res.json(
            {
                success:false,
                message:"Please provide valid course ID ",
            }
        )
    }

    //validation for course details
    let courseDetils;
    try {
        courseDetils = await Course.findById(course_Id);
        if(!courseDetils){
            return res.status(404).json(
                {
                    success:false,
                    message:"course not found",
                }
            )
        }        
        
        let uid = new mongoose.Types.ObjectId(userId);  //!!!!!!!!!!!!!!!!!!!! CHECK THIS !!!!!!!!!!!!!!!!!!!
        if(courseDetils.studentsEnrolled.includes(uid)){
            return res.json(
                {
                    success:false,
                    message:"Student is already enrolled",
                }
            )
        }

    } catch (error) {
        return res.status(500).json(
            {
                success:true,
                message:"Failed to fetch the course details",
                error:error.message,
            }
        )
    }

    //order create 
    const amount = courseDetils.price;
    const currency = "INR";
    const options = {
        amount:amount*100,
        currency:currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:course_Id,
            userId,
        }
    }

    try {
        const razorpayResponse = await instance.orders.create(options);
        console.log("RAZORPAY RESPONSE -> ", razorpayResponse);


        return res.status(200).json({
            success:true,
            courseName:courseDetils.courseName,
            courseDescription:courseDetils.courseDescription,
            thumbnail: courseDetils.thumbnail,
            orderId: razorpayResponse.id,
            currency:razorpayResponse.currency,
            amount:razorpayResponse.amount,
        });
        
    } catch (error) {
        return res.status(500).json(
            {
                success:false,
                message:"Failed to create the order",
                error:error.message,
            }
        )
        
    }
}

//verify the signature of Razorpay 
exports.verifySignature = async(req,res) => { 
    const webhookSecret = "12345";
    const signature = req.headers["x-razorpay-signature"];

    const shasum =  crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log("Payment authorized")

        try{
            const {courseId , userId} = req.body.payload.payment.entity.notes;

            const enrolledCourse = await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{
                    studentsEnrolled:userId
                }},
                {new:true}
            )

            if(!enrolledCourse){
                return res.status(404).json(
                    {
                        success:false,
                        message:"Course not found",
                    }
                )
            }

            const enrolledStudent = await User.findOneAndUpdate(
                {_id:userId},
                {$push:{
                    courses:courseId
                }},
                {new:true},
            )

            console.log("Enrolled Student -> " , enrolledStudent);

            const mailResponse = await mailSender(enrolledStudent.email,
                "Congratulations from CodeHelp",
                "Congratulations, you are onboarded into new CodeHelp Course"  
            )

            console.log("Email-response-> ", mailResponse);
            
            return res.status(200).json(
                {
                    success:true,
                    message:"Signature Verified and Course Added",
                }
            )

        } catch(error){
            return res.status(500).json(
                {
                    sucess:false,
                    message:"Something went wrong while full-filling the action"
                }
            )
        }
    }
    else{
        return res.status(400).json(
            {
                success:false,
                message:"Invalid request",
            }
        )
    }
}