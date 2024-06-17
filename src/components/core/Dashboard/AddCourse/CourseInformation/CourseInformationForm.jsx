import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import RequirementField from './RequirementField'

const CourseInformationForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors}
  } = useForm()

  const dispatch = useDispatch()
  // const {course ,editCourse} = useSelector(state => state.course)
  const editCourse = true;
  const [loading , setLoading] = useState(false);
  const [courseCategory , setCourseCategory] = useState([]);

  const formSubmitHandler = async(data) =>{

  }

  

  return (
    <form 
    onSubmit={handleSubmit(formSubmitHandler)}
    className='rounded-md border-richblack-700 bg-richblue-800 p-6 space-y-8'
    >
      <div>
        <label>
          <p>Course title <sup>*</sup></p>
          <input
            type='text'
            name='courseTitle'
            placeholder='Enter Course Title'
            {...register("courseTitle" , {required:true})}
            className='w-full'
          />
          {
            errors.courseTitle && (
              <span>
                Please enter course title
              </span>
            )
          }
        </label>
      </div>

      <div>
        <label>
          <p>Course Short Description
          <sup>*</sup></p>

          <textarea
            name='courseShortDesc'
            placeholder='Enter Course short Description'
            {...register ( "courseShortDesc" , {required:true})}
            className='min-h-[130px] w-full'
          />
          {
            errors.courseShortDesc && (
              <span>
                Plase enter course description
              </span>
            )
          }
        </label>
      </div>
      

      <div>
        <label>
          <p>Course Price <sup>*</sup></p>
          <input
            type='text'
            name='coursePrice'
            placeholder='Enter Course Price'
            {...register("coursePrice" , {
              required:true,
              valueAsNumber:true,
              
              })}
            className='w-full'
          />
          <HiOutlineCurrencyRupee/>
          {
            errors.coursePrice && (
              <span>
                Please enter course price
              </span>
            )
          }
        </label>
      </div>

      <div>
        <label>
          <p>Course category
          <sup>*</sup></p>

          <select
            name='courseCategory'
            defaultChecked=""
            {...register("courseCategory" , {required:true})}
          >
            <option value={""} disabled>
              Choose a category
            </option>
            {
              !loading && courseCategory.map( (category ,index) => {
                return (
                  <option key={index} value={category?.id}>
                    {category?.name}
                  </option>
                )
              })
            }
          </select>
          {
            errors.courseCategory && (
              <span>
                please select category
              </span>
            )
          }
        </label>
      </div>

      {/* Create a custom componenet for handlingd tags input */}
      {/* <ChipInput/> */}

      {/* create a componenert for uploading and showing preview of media  */}
      

      {/* Benefits of the course */}
      <div>
        <label>
          <p>Benefits of Course<sup>*</sup></p>
          <textarea
            name='courseBenefits'
            placeholder='Enter the benefits of the course'
            {...register("courseBenefits" , {required:true})}
            className='min-h-[130px] w-full'
          />
          {
            errors.courseBenefits && (
              <span>
                plase enter benefits of course 
              </span>
            )
          }
        </label>
      </div>

      {/* Requirement field */}
      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <div>
        {
          editCourse && (
            <button></button>
          )
        }
      </div>

    </form>
  )
}

export default CourseInformationForm