const mongoose = require('mongoose');

//define the category schema 
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
        },
    ]
});

module.exports = mongoose.model('Category' , categorySchema);