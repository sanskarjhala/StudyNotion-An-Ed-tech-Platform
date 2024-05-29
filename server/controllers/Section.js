const Section = require('../models/Section');
const Course = require('../models/Course');

//create section handler 
exports.createSection = async(req,res) => {
    try {
        //data fetch from body 
        const { sectionName , courseId} = req.body;

        //perform validation 
        if(!sectionName || !courseId){
            return res.status(400).json(
                {
                    success:false,
                    message:"Missing deatils/Properties",
                }
            )
        }
        
        //create section 
        const newSection = await Section.create({sectionName})

        //update course details schema 
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true}
        ).populate({
            path: "courseContent",
            populate: {
                path: "SubSection",
            },
        })
        .exec();
        //return response 
        return res.status(200).json(
            {
                success:true,
                message:"Course-section created succefully",
                updatedCourseDetails,
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                success:false,
                message:"Unable to create the course , please try again later",
                error:error.message,
            }
        )
    }
}

//update section handler
exports.updateSection = async (req,res) => { 
    try {
        //data fetch from request body 
        const {sectionName , sectionId} = req.body;

        //validation
        if(!sectionName || !sectionId){
            return res.status(400).json(
                {
                    success:false,
                    message:"Missing properties",
                }
            )
        }
        
        //update section data
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {sectionName},//yeah check krna hai sir ne sirf direct sectionName update krva diya hai 
            {new:true}
        )

        //return response
        return res.status(200).json(
            {
                success:true,
                message:"Section Updated Successfully",
                updatedSection
            }
        ) 

    } catch (error) {
        return res.status(500).json(
            {
                success:false,
                message:"Unable to update the section",
                error:error.message
            }
        )
    }
}

//delete section handler
exports.deleteSection = async(req,res) =>{
    try {
        //data fetch from request body
        //assuming that we are sending id in params 
        const {sectionId} = req.params

        await Section.findByIdAndDelete(sectionId)
        //TODO[while testing] : Do we need to delete the entry for the course Schema 
        //return response 
        return res.status(200).json(
            {
                success:true,
                message:"Course-Section deleted successfully"
            }
        )        
        
    } catch (error) {
        return res.status(500).json(
            {
                success:false,
                message:"Failed to delete the section",
                error:error.message,
            }
        )
    }
}