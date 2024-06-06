import React from "react";
import CTAButton from "../HomePage/Button"
import HighLightText from "../HomePage/HighLightText";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningSection = () => {
  return (
    <div className="grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 lg:w-fit ">
      {LearningGridArray.map((card, index) => {
        return (
          <div
            key={index}
            className={`${index === 0 && "lg:col-span-2 lg:h-[280px] p-5 bg-transparent"} 
                        ${
                          card.order % 2 === 1
                            ? "bg-richblack-700 lg:h-[280px] p-5"
                            : "bg-richblack-800 lg:h-[280px] p-5"
                        }
                        ${card.order === 3 && "lg:col-start-2"}`}
          >
            {
                card.order < 0 
                ? (
                    <div className="lg:w-[90%] flex flex-col pb-5 gap-3 ">
                        <div className="text-4xl font-semibold">
                            {card.heading}
                            <HighLightText text={card.highlightText}/>
                        </div>
                        <p className="font-medium">
                            {card.description}
                        </p>
                        <div className="w-fit mt-4">
                            <CTAButton active={true} linkedTo={card.BtnLink}>
                                {card.BtnText}
                            </CTAButton>
                        </div>
                    </div>
                )
                : (
                    <div className="flex flex-col gap-8 p-7">
                        <h1 className="text-richblack-5 text-lg font-bold">{card.heading}</h1>
                        <p className="text-richblack-300 text-sm">
                            {card.description}
                        </p>
                    </div>
                ) 
            }

          </div>
        );
      })}
    </div>
  );
};

export default LearningSection;
