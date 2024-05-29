const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require('../mail/templates/emailVerificationTemplate');

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60*1000,
    },
});

//define functions to send the email
async function sendVerificationEmail (email , otp){
    //create the transporter to send email 
    //define the email options 
    //send the email 
    try {
        const mailResponse = await mailSender(email , "Verification Email for StudyNotion" , emailTemplate(otp));
        console.log("Mail send successfully ",mailResponse.response)
    } catch (error) {
        console.log("error occured while sending mail ",error);
        throw error;
    }
}

//defineinf post-save hook to send email after the document has been save 
otpSchema.pre('save' , async function (next) {
    console.log("New document saved to database");

    //only send an email when a new dovument is created 
    if(this.isNew){
        await sendVerificationEmail(this.email , this.otp);
    }
    next();
});



module.exports = mongoose.model('OTP' , otpSchema);