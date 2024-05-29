const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        requried:true,
        trim:true,
    },
    courseDescription:{
        type:String,
        requried:true,
        trim:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        requried:true,
        ref:"User",
    },
    whatYouWillLearn:{
        type:String,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],
    RatingAndReview:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview",
        }
    ],
    price:{
        type:Number,
    },
    thumbnail:{
        type:String,
        requried:true,
    },
    tag:{
        type:[String],
        requried:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    studentsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            requried:true,
            ref:"User"
        }
    ],
    instructions:{
        type:[String],
    },
    status:{
        type:String,
        enum:["Draft" , "Published"]
    },
});

module.exports = mongoose.model('Course' , courseSchema);