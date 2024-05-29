const mongoose = require('mongoose');

const ratingAndReviewSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,//maybe not presnt here becaause user do only rating too 
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Course",
        index:true,
    },

});

module.exports = mongoose.model('RatingAndReview' ,ratingAndReviewSchema);