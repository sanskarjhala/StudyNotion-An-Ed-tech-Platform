import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../../../common/IconButton";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";

const PublishCourse = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const goToCourse = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses")
  };

  const handleCoursePublish = async() => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      //no Updation made made in form
      //no need to call API because the data is not not data
      goToCourse();
      return;
    }

    //if form is updated 
    const formData = new FormData();
    formData.append("courseId" , course._id);
    const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    console.log("COURSE_STATUS : " , courseStatus)
    formData.append("status" , courseStatus);

    setLoading(true);
    const result = await editCourseDetails(formData , token)

    //validation
    if(result){
        goToCourse();
    }

    setLoading(false);
  };

  const onSubmit = async () => {
    handleCoursePublish();
  };

  const goback = () => {
    dispatch(setStep(2));
  };

  return (
    <div className="text-richblack-5 rounded-md border-[1px] border-richblack-600 bg-richblack-800 p-6">
      <p className="text-xl font-semibold py-2" >Publish Course</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="flex items-center gap-x-2">
            <input
              type="checkbox"
              name="status"
              {...register("public")}
              className=""
            />
            <p>Make this course as public</p>
          </label>
        </div>

        <div className="flex justify-end gap-x-4 mt-4">
          <button disabled={loading} type="button" onClick={goback} className="px-6 py-2 font-semibold bg-richblack-600 rounded-xl">
            Back
          </button>

          <IconButton text={"Save Changes "} 
          disabled={loading} 
          type={"submit"}
          customClasses={"px-6 py-2 font-semibold text-richblack-900 rounded-xl bg-yellow-50"}
          />
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
