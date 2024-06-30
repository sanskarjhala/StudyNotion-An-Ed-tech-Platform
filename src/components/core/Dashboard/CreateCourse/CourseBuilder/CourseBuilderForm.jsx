import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconButton from "../../../../common/IconButton";
import { GrAddCircle } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import NestedView from "./NestedView";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const CourseBuilderForm = () => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);

  const cancelEdit = () => {
    console.log("SECTION EDIT CANCLE FUNCTION CALLED : ")
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please enter atleast one section");
      return;
    }

    //if any section's subsection should not be empty
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please enter atleasty one lecture in each section");
      return;
    }

    dispatch(setStep(3));
  };

  const onSubmit = async (data) => {
    setLoading(true);

    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    }

    //if you are not updating the section
    else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    //if we got result
    if (result) {

      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  };

  const handlerChangeEditSectionName = (sectionId, sectionName) => {
    //if sectionId is already present in editSectionName soo we have to cacle it by edit button
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="text-richblack-5">
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Section Name
              <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              name="SectionName"
              // disabled={loading}
              {...register("sectionName", { required: true })}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
            />
            {errors.sectionName && (
              <span className="text-pink-200 ou">
                Please enter section name
              </span>
            )}
          </label>
        </div>

        <div className="mt-8">
          <IconButton
            type={"submit"}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            customClasses={
              "border px-[12px] py-[8px] border-yellow-25 text-yellow-25 flex items-center  gap-x-2 font-semibold"
            }
          >
            <GrAddCircle />
          </IconButton>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* if courseContenet is prensent then i will render the nested view */}
      
      {course.courseContent.length > 0 && (
        <NestedView
          handlerChangeEditSectionName={handlerChangeEditSectionName}
        />
      )}

      <div className="flex justify-end gap-x-3 mt-6">
        <button
          onClick={goBack}
          className="cursor-pointer rounded-xl bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
        >
          back
        </button>
        <IconButton
          text={"Next"}
          onClick={goToNext}
          disabled={loading}
          customClasses={
            "bg-yellow-50 text-richblack-900 font-semibold hidden lg:flex  gap-x-1 sm:gap-x-2 items-center  px-6 py-2 sm:px-6 sm:py-3 rounded-xl"
          }
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </IconButton>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
