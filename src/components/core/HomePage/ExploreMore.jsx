import React, { useState } from "react";
import HighLightText from "./HighLightText";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";

const ExploreMore = () => {
  const tabs = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths",
  ];

  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCard = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  //   console.log(currentCard , currentTab , )

  return (
    <div >
      <div className="text-4xl font-bold text-center">
        Unlock the
        <HighLightText text={"Power of Code"} />
      </div>

      <p className="text-center text-md text-richblack-300  font-thin mt-3 mb-10 ">
        Learn to build anything you can imagine
      </p>

      <div
        className="mt-10 flex flex-row items-center rounded-full bg-richblack-800 border-1 border-richblack-100
      px-1 py-1 gap-3"
      >
        {tabs.map((element, index) => {
          return (
            <div
              className={`text-[16px] flex flex-row items-center gap-2 
                    ${
                      currentTab === element
                        ? "bg-richblack-900 text-richblack-5 font-medium"
                        : "text-richblack-200"
                    } rounded-full transition-all duration-200 cursor-pointer
                hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
              key={index}
              onClick={() => setMyCard(element)}
            >
              {element}
            </div>
          );
        })}
      </div>

      <div className="lg:h-[250px]"></div>

      {/* course card ka group */}
      <div
        className="lg:absolute gap-4 justify-center lg:gap-0 flex  lg:justify-between 
        flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[30%]
       text-black lg:mb-0 mb-7 lg:px-0 px-3"
      >
        {courses.map((element, index) => {
          return (
            <CourseCard
              key={index}
              cardData={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>

      
    </div>
  );
};

export default ExploreMore;
