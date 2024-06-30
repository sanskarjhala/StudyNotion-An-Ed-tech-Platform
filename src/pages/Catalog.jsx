import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { getCategoryPageData } from "../services/operations/pageAndComponentData";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Course_card from "../components/core/Catalog/Course_card";


const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  //Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id = res?.data?.data?.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCategoryPageData(categoryId);
        console.log("PRinting res: ", res);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  return (
    <div className="text-richblack-5">
      <div>
        <p>
          {`Home/Catalog/`}
          <span>{catalogPageData?.data?.selectedCategory?.name}</span>
        </p>
        <p>{catalogPageData?.data?.selectedCategory?.name}</p>
        <p>{catalogPageData?.data?.selectedCategory?.description}</p>
      </div>

      <div>
        {/* Section 1 */}
        <div>

          <div>Courses to get you started</div>
          <div className="flex">
            <p>Most Popular</p>
            <p> New </p>
          </div>
         <div>
            <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
         </div>


        </div>

        {/* Section2 */}
        <div>
          <p>Top Courses in {catalogPageData?.data?.selectedCategory?.name} </p>
          <div>

          <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses}/>
          </div>
        </div>

        {/* Section 3 */}
        <div>
          <div>Frequently Bought</div>
          <div className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {
                    catalogPageData?.data?.mostSellingCourse?.slice(0,4)
                    .map((course, index) => {
                        return <Course_card course={course} key={index} Height={"400px"}

                        />
                    })
                }
            </div>
          </div>
        </div>


      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
