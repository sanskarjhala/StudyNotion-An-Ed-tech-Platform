const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        //get email from req ki body 
        const email = req.body.email;

        //check user for this email , email validation 
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).json(
                {
                    success:false,
                    message:"your email is not registered with us",
                }
            )
        }

        //generate token
        const token = crypto.randomUUID();

        //update user by adding token and expiration time 
        const updatedDetails = await User.findOneAndUpdate({email:email} , { 
                                                            token:token,
                                                            resetPasswordExpires: Date.now()+5*60*1000,
                                                        },
                                                        {new:true}
                                                        );
        
        console.log("DETAILS ", updatedDetails)
        //create url 
        const url = `http://localhost:300/update-password/${token}`

        //send mail containg the url
        await mailSender(email, "Password Reset Link" , `Password reset link ${url}`)

        // return Respose
        return res.status(200).json(
            {
                success:true,
                message:"email sent successfully, please cehck mail and change pwd",
            }
        )

       
    } catch (error) {
        console.log(error);
        return res.status().json(
            {
                success:false,
                message:"something went wrong while reset password",
            }
        )
    }
}


//resetPassword
exports.resetPassword = async ( req,res) => {
    try {
        //data fetch
        const {password,confirmPassword , token}  = req.body // frontend ne body 
        // me dalke humne send krdi hai tabhi hum isko hum body se utha paa rahe hai ,,,,, parameter se kyo nahiuthaya ??

        //validation
        if(password !== confirmPassword){
            return res.status(403).json(
                {
                    success:false,
                    message:"password not matching "
                }
            )
        }

        //get user deatils from db using token
        const userDetails = await User.findOne({token:token});

        //if not entry - invalid token
        if(!userDetails){
            return res.json(
                {
                    success:false,
                    message:"token is invalid"
                }
            )
        } 

        //token -time
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json(
                {
                    success:false,
                    message:"Token is expire, please regenerate the token"
                }
            )
        }

        //hashpassword
        const hashedPassword = await bcrypt.hash(password,10);

        //update password
        const updatedPassword = await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        ) 

        //return response 
        return res.status(200).json(
            {
                success:true,
                data:updatedPassword,
                message:"Password rest Successfully"
            }
        )

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"prblem occured while reseting password",
            }
        )
    }
}