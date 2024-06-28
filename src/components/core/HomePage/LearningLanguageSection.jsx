import React from "react";
import HighLightText from "./HighLightText";
import knowYourProgress from "../../../assets/Images/Know_your_progress.png"
import compareWithOthers from "../../../assets/Images/Compare_with_others.png"
import planWithOthers from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./Button"

const LearningLanguageSection = () => {
  return (
    <div className="mt-40 mb-32">
      <div className="flex flex-col gap-5 items-center ">
        <div className="text-4xl font-bold text-center">
          Your Swiss Knife for
          <HighLightText text={"learing any language"} />
        </div>

        <div className="text-center text-richblack-600 mx-auto text-base mt-3 w-[70%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center mt-5">
            <img 
                src={knowYourProgress}
                alt="KnowYourProgress"
                className="object-contain lg:-mr-32 "
            />
             <img 
                src={compareWithOthers}
                alt="compareWithOthers"
                className="object-contain"
            />
             <img 
                src={planWithOthers}
                alt="planWithOthers"
                className="object-contain lg:-ml-36"
            />
        </div>

        <div className="w-fit ">
            <CTAButton active={true} linkedTo={"/signup"}>
                <div>
                    Learn More
                </div>
            </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
