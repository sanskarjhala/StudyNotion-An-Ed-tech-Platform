const Tag = require('../models/Tag');

//tags ko categoryu me convert krna hai 
//sir file me jab change karenge jab cionfirm krke yeah kam krna hai 

//create tags
exports.createTag = async(req,res) => {
    try {
        //data fetch 
        const {name , description} = req.body;

        //validation
        if(!name || !description){
            return res.status(400).json(
                {
                    success:false,
                    message:"Please fill all the fields and try again",
                }
            )
        }

        //create entry in database
        const tagDetails = await Tag.create({
            name:name,
            description:description,
        });

        console.log("Tag details -> ", tagDetails);

        //return response
        return res.status(200).json(
            {
                success:true,
                message:"New Tag create succesfully",
            }
        )

    } catch (error) {
        console.error(error);
        return res.status(500).json(
            {
                success:false,
                message:"error while createing a tag"
            }
        )
    }
}



//getAllTags
exports.showAllTags = async(req,res) => {
    try {
        //fetch data 
        const allTags = await Tag.find({} , {name:true , description:true})
        //return response
        return res.status(200).json(
            {
                success:false,
                message:"All tags fetched Succefully",
                allTags
            }
        )
    } catch (error) {
        console.error(error);
        return res.status(500).json(
            {
                success:false,
                message:"Error occured while fetching all tags",
            }
        )
    }
}
