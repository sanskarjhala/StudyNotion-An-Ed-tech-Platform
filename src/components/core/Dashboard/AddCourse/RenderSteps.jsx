import React from "react";
import { FaCheck } from "react-icons/fa";
// import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm"

const RenderSteps = () => {
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

//   const { step } = useSelector((state) => 1);
const step =1 ;
  return (
    <>
      <div>
        {steps.map((item) => (
          <div  key={item.id}>
            <div>
              <div
             
                className={`${
                  step === item.id
                    ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                    : "border-richblack-700 bg-richblue-800 text-richblack-300"
                }`}
              >
                {step > item.id ? <FaCheck className="bg-yellow-900 border-yellow-50 text-yellow-50"/> : item.id}
                {/* Add dashes between labels */}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        {steps.map((item) => (
          <div key={item.id}>
            <div >
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {step === 1 && <CourseInformationForm />}
      {/* {step === 2 && <CourseBuilderForm /> }
      {step === 3 && <PublishCourseForm />} */}
    </>
  );
};

export default RenderSteps;
