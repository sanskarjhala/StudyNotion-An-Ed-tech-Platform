const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

//handler for creating Rating and review 
exports.createRating = async(req,res) => { 
    try {
        //fetch user id 
        const userId = req.user.id;
        //fetch course Id review and rating from body  
        const {review , rating , courseId} = req.body;

        //check student enrolled in the course or not !!!!!!!!!!!!!!!!!!!!! have To cehck this !!!!!!!!!!!!!!!!!!!!!!!!
        const courseDetails = await Course.findOne(
            {_id:courseId,
                studentsEnrolled:{$elemMatch:{$eq:userId}}
            }
        )

        if(!courseDetails){
            return res.status(404).json(
                {
                    success:false,
                    message:"Student not enrolled in the Course",
                }
            )
        }

        //check if user Already reviewed 
        const alreadyReviewed = await RatingAndReview.findOne(
            {user:userId,course:courseId}
        )

        if(alreadyReviewed){
            return res.status(403).json(
                {
                    success:false,
                    message:"Course is laredy reviewd by the user/student",
                }
            )
        }

        //create rating adn review 
        const ratingReview = await RatingAndReview.create({
            rating,review,
            user:userId,
            course:courseId,
        });

        const updatedCourseDetails = await Course.findByIdAndUpdate(
            {_id:courseId},
            {
                $push:{
                    RatingAndReview:ratingReview._id,
                }
            },
            {new:true},
        );

        console.log("UPDATED COURSE DETAILS -> " , updatedCourseDetails);

        //return response
        return res.status(200).json(
            {
                succes:true,
                message:'Rating and Review created successfully',
                createRaitng_Response:ratingReview,
            }
        )
        
    } catch (error) {
        return res.status(500).json(
            {
                success:false,
                message:"Unable to create the Rating and Review",
                error:error.message,
            }
        )
    }
}

//get average Rating 
exports.getAverageRating = async(req,res) => { 
    try {
        //fetch the course id
        const {courseId} = req.body;

        //calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg: "$rating"},
                }
            }
        ]);


        //return rating
        if(result.length>0){
            return res.status(200).json(
                {
                    success:true,
                    averageRating: result[0].averageRating,
                }
            )
        }

        //if no rating and review exist 
        return res.status(200).json(
            {
                success:true,
                message:'Average Rating is 0, no ratings given till now',
                averageRating:0,
            }
        )
        
    } catch (error) {
        return res.status(500).json(
            {
                succes:false,
                message:"Unable to get average rating",
                error:error.message,
            }
        )
    }
}

//handler to fetch all rating 
exports.getAllRating = async(req,res) => { 
    try {
        //fetch course id 
        const allRatingAndReview = await RatingAndReview.find({})
        .sort({rating:"desc"})
        .populate({
            path:"user",
            select:"firstName lastname email image",
        })
        .populate({
            path:"course",
            select:"courseName"
        })
        .exec();

        return res.status(200).json(
            {
                succes:true,
                message:"Successfully fetched All details",
                data:allRatingAndReview,
            }
        );
        
    } catch (error) {
        return res.status(500).json(
            {
                success:false,
                message:"Unable to get all ratings and reviews",
                error:error.message,
            }
        )
    }
}