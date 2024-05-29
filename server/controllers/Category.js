const Category = require('../models/Category');

//Handler to create the category 
exports.createCategory = async(req, res) => {
    try {
        //data fetch 
        const { name , description} = req.body;
        if(!name){
            return res.status(400).json(
                {
                    success:false,
                    message:"All fields are required",
                }
            )
        }

        //find entry for category if we are not creating same category
        // const checkCategory = await Category.find({name});
        // if(checkCategory){
        //     return res.status(403).json(
        //         {
        //             success:false,
        //             message:"Category already created",
        //         }
        //     )
        // }

        const newCategory = await Category.create(
            {
                name:name,
                description:description,
            }
        );

        console.log("New Category -> ", newCategory);

        return res.status(200).json(
            {
                success:true,
                message:"New category created successfull",
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                success:false,
                message:"Unable to create the category",
                error:error.message,
            }
        )
    }
}

//handler to show all tags 
exports.showAllCategories = async(req,res) => {
    try {
        const allCategory = await Category.find({} , {name:true , description:true});
        
        return res.status(200).json(
            {
                success:true,
                message:"All category fetched Successfully",
                allCategory,
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success:false,
                message:"Unable to fetch the category",
                error:error.message,
            }
        )
        
    }
}

exports.categoryPageDetails = async(req,res) => { 
    try {
        const {categoryId} = req.body;
        
        //fetching courses for selected courses
        const selectedCategory = await Category.findById(categoryId).populate("courses").exec();
        if(!selectedCategory){
            return res.status(404).json(
                {
                    success:false,
                    message:"Category not Found",
                }
            )
        }

        if(selectedCategory.courses.length === 0){
            return res.status(404).json(
                {
                    success:false,
                    message:"No courses found for selected category",
                }
            )
        }

        const selectedCourses = selectedCategory.courses;

        //fetching courses for other courses
        const categoriesExeptSelected = await Category.find(
            {_id : {$ne: categoryId}},
        ).populate("courses").exec();

        const otherCategoryCourses =[];
        for(const category of categoriesExeptSelected){
            otherCategoryCourses.push(...category.courses);
        }

        //get top selling courses
        //!!!!!!!!!!!!!!!!!!!!! PENDING !!!!!!!!!!!!!!!!!!!!!!!!
        
        
    } catch (error) {
        return res.status(500).json(
            {
                success:false,
                message:"Internal Server Error",
                error:error.message,
            }
        )
    }
}