import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';


const RenderSteps = () => {

   
    const {step} = useSelector((state)=> state.course);
    console.log("STEP : " ,step);
  

    const steps = [
        {
            id:1,
            title: "Course Information",
        },
        {
            id:2,
            title: "Course Builder",
        },
        {
            id:3,
            title: "Publish",
        },
    ]

  return (
    <>
        <div className='grid grid-cols-3 px-6 py-3  justify-items-center'>
            {steps.map( (item) => (
                <div key={item.id}>
                    <div >
                        <div className={`${ step === item.id 
                        ? "bg-yellow-900 border-yellow-50 text-yellow-50" 
                        : "border-richblack-700 bg-richblack-800 text-richblack-300"}
                            px-6 py-4 rounded-full
                        `}>

                        {
                            step > item.id ? (<FaCheck/>) :(item.id)
                        }

                        </div>
                    </div>
                   {/* Add COde for dashes between the labels */}
                </div>
            ) )}
        </div>
        <div className='grid grid-cols-3 px-6 mb-8 mt-2 justify-items-center'>
            {steps.map((item) => (
                <div key={item.id}>
                    <div>
                        <p>{item.title}</p>
                    </div>
                </div>
            ))}
        </div>

        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm/>}
        {/* {step===3 && <PublishCourse/>} */}
    </>
  )
}

export default RenderSteps
