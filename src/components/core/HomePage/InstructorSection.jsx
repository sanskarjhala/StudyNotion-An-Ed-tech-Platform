import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighLightText from "./HighLightText";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="mt-24 translate-x-20">
      <div className="flex flex-row gap-16 items-center">
        <div className="shadow-[-20px_-20px_0px_2px_#f7fafc] w-[50%] rounded-sm">
          <img
            src={Instructor}
            alt="Instructor"
            className="object-fit rounded-sm"
          />
        </div>

        <div className="flex flex-col gap-20 w-[50%]">
          <div className="text-4xl font-bold">
            Become an
            <HighLightText text={"Instructor"} />
          </div>

          <p className="font-medium text-[16px] text-richblack-300 w-[80%]">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit">
            <CTAButton active={true} linkedTo={"/signup"}>
              <div className="flex flex-row gap-2 items-center">
                Start Learning
                <FaArrowRight></FaArrowRight>
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
