import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconButton from "../../../../common/IconButton";
import { GrAddCircle } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { setEditCourse, setStep } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";

const CourseBuilderForm = () => {

  const { course } = useSelector(state => state.course)
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [editSectionName , setEditSectionName] = useState(null);

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName" , "");
  }

  const goback = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true))
  }

  const goToNext = () => {
    if(course.courseContent.length === 0 ) toast
  }

  return (
    <div className="text-richblack-5">
      <p>Course Builder</p>
      <form>
        <div>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Section Name
              <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              name="SectionName"
              {...register("sectionName", { required: true })}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
            />
            {
                errors.sectionName && (
                    <span className="text-pink-200 ou">Please enter section name</span>
                )
            }
          </label>
        </div>

        <div className="mt-8">
            <IconButton
                type={"submit"}
                text={editSectionName ? "Edit Section Name" : "Create Section"}
                customClasses={"border px-[12px] py-[8px] border-yellow-25 text-yellow-25 flex items-center  gap-x-2 font-semibold"}>
                    <GrAddCircle/>
            </IconButton>
            {
              editSectionName && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="text-sm text-richblack-300"
                >
                  Cancel Edit
                </button>
              )
            }
        </div>
      </form>

      {
        course.courseContent.length > 0 && (
          <NestedView/>
        )
      }

      <div className="flex justify-end gap-x-3">
        <button 
          onClick={goBack}
          className="rounded-md cursor-pointer items-center flex "
        >
          back
        </button>
        <IconButton  text={"Next"} onClick={goToNext}>
          {/* NEED TO ADD ARROW */}
        </IconButton>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
