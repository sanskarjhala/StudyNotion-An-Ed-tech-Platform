const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

//create sub-section handler
exports.createSubSection = async(req,res) => {
    try {
        //data fetch 
        const{sectionId ,title ,description,timeDuration} = req.body;
        //fetch vedio file from request files 
        const video = req.files.videoFile;

        //perform validation 
        if(!sectionId || !title || !description || !timeDuration || !video){
            return res.status(400).json(
                {
                    success:false,
                    message:"Missing parameters while creating subsection"
                }
            )
        }

        //uplaodng video file to cloudinary 
        const uploadDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);

        //create a sub-section
        const subSectionDetails = await SubSection.create({
            title:title,
            description:description,
            timeDuration:timeDuration,
            videoUrl:uploadDetails.secure_url,
            
        })

        //update section schema with sub-section id
        const updatedSection = await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $push:{
                    subSection:subSectionDetails._id
                }
            },
            {new:true}
        ).populate("subSection").exec(); // homework Check krna hai 
        //HW: log updated section here, after adding populate query 

        //return Response 
        return res.status(200).json(
            {
                success:true,
                message:"Sub-Section created succesfully",
                updatedSection
            }
        )
        
    } catch (error) {
        return res.status(500).json(
            {
                success:false,
                message:"unable to create sub-section",
                error:error.message,
            }
        )
    }
}

//HW - update subsection 
exports.updateSubSection = async(req,res) => {
    try {
        //fetch data from request ki body 
        const {subSectionId , title , description , timeDuration} = req.body;

        //fetch video file from request files
        const video = req.files.videoFile;

        //perform validation
        if(!subSectionId || !title || !description || !timeDuration || !video){
            return res.status(400).json(
                {
                    success:false,
                    message:"Missing parameters, please fell all details"
                }
            )
        }

        //update to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);

        //update subSection sechma 
        const updatedSubSection = await SubSection.findByIdAndUpdate(
            subSectionId,
            {
                title:title,
                description:description,
                timeDuration:timeDuration,
                videoUrl:uploadDetails.secure_url,

            },
            {new:true}
        )

        //return response
        return res.status(200).json(
            {
                success:true,
                message:"Sub-Section upadted successfully",
                updatedSubSection
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                success:false,
                message:"Unable to update the sub-section",
                error:error.message,
            }
        )
    }
}

//HW - delete sub-section handler
exports.deleteSubSection = async(req,res) => { 
    try {
        //if params me send krte hai toh req.params nahi toh take id from bodyu according to upcoming class
        const{subSectionId} = req.params

        if(!subSectionId){
            return res.status(400).json(
                {
                    success:false,
                    message:"Parameter missing in  deleting sub-section"
                }
            )
        }

        await SubSection.findByIdAndDelete(subSectionId);

        return res.status(200).json(
            {
                success:false,
                message:"Sub-Section deleted successfully"
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                success:false,
                message:"Failed to selete the sub section",
                error:error.message,
            }
        )
    }
}