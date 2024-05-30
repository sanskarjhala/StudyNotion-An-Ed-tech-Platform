import React from "react";

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timeLineImage from "../../../assets/Images/TimelineImage.png";
import Gradient2 from "../../../assets/Images/Gradient 2.svg";

const TimeLineSection = () => {
  const timeLine = [
    {
      Logo: Logo1,
      heading: "Leadership",
      description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      heading: "Responsibility",
      description: "Students will always be our top priority",
    },
    {
      Logo: Logo3,
      heading: "Flexibility",
      description: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      heading: "Solve the Problem",
      description: "Code your way to a solution",
    },
  ];
  return (
    <div>
      <div className="flex flex-row gap-20 items-center justify-between ">
        <div className="w-[45%] flex flex-col gap-12">
          {timeLine.map((element, index) => {
            return (
              <div className="flex flex-row  gap-6" key={index}>
                <div className="w-[50px] h-[50px] bg-white flex items-center justify-center">
                  <img src={element.Logo} alt="logo1" />
                </div>

                <div>
                  <h2 className="font-semibold text-[18px]">
                    {element.heading}
                  </h2>
                  <p className="text-base">{element.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative shadow-blue-200">
          <img src={Gradient2} alt="gradient" className="absolute -left-20" />

          <img
            src={timeLineImage}
            alt="timeLineImage"
            className="rounded-md bg-white"
          />

          <div
            className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase
          py-6  left-[50%] translate-x-[-50%] translate-y-[-50%]"
          >
            <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-200 px-7">
              <p className="text-3xl font-bold">10</p>
              <p className="text-caribbeangreen-200 text-sm">
                Years of Experience
              </p>
            </div>

            <div className="flex flex-row gap-5 items-center px-7">
              <p className="text-3xl font-bold">250</p>
              <p className="text-caribbeangreen-200 text-sm">
                Types of Courses
              </p>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLineSection;
