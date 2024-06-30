const Category = require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

//Handler to create the category
exports.createCategory = async (req, res) => {
  try {
    //data fetch
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
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

    const newCategory = await Category.create({
      name: name,
      description: description,
    });

    console.log("New Category -> ", newCategory);

    return res.status(200).json({
      success: true,
      message: "New category created successfull",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create the category",
      error: error.message,
    });
  }
};

//handler to show all tags
exports.showAllCategories = async (req, res) => {
  try {
    const allCategory = await Category.find({});

    return res.status(200).json({
      success: true,
      message: "All category fetched Successfully",
      data: allCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch the category",
      error: error.message,
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        // populate: "ratingAndReviews",
      })
      .exec();

    //handle the case when category is not found
    if (!selectedCategory) {
      console.log("Category not found");
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    //handel the case when there is no courses with specific category
    // if (selectedCategory.courses.length === 0) {
    //   console.log("No Courses found for the selected Category");
    //   return res.status(404).json({
    //     success: false,
    //     message: "No course Found for the selected category",
    //   });
    // }

    //get the course for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();

    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec();
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);
    // console.log("mostSellingCourses COURSE", mostSellingCourses)
    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
