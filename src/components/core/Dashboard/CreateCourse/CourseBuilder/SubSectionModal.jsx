import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../../../../slices/courseSlice";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { RxCross1 } from "react-icons/rx";
import IconButton from "../../../../common/IconButton"
import Upload  from "../Upload";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }

    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }

    setLoading(true);
    //API CALL
    const result = await updateSubSection(formData, token);

    if (result) {
      const updatedCourseContent = course.courseContent.map(section => section._id === modalData.sectionId ? result : section)
      const updatedCourse = {...course , courseContent:updatedCourseContent}
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated) {
        toast.error("No Changes Made");
      } else {
        //do edit
        handleEditSubSection();
      }
      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("videoFile", data.lectureVideo)
    setLoading(true);

    //API CALL
    const result = await createSubSection(formData, token);

    if (result) {
      const updatedCourseContent = course.courseContent.map(section => section._id === modalData ? result : section)
      const updatedCourse = {...course , courseContent:updatedCourseContent}
      dispatch(setCourse(updatedCourse));
    }

    setModalData(null);
    setLoading(false);
  };

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture{" "}
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross1 className="text-2xl text-richblack-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}  className="space-y-8 px-8 py-10">
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5">
              <p  className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Lecture Title <sup className="text-pink-200">*</sup>
              </p>
              <input
                name="lectureTitle"
                placeholder="Enter Lecture Title"
                {...register("lectureTitle", { required: true })}
                style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
              />
              {errors.lectureTitle && <span className="ml-2 text-xs tracking-wide text-pink-200">Lecture title is required</span>}
            </label>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5">
              <p  className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Lecture Description<sup className="text-pink-200">*</sup>
              </p>
              <textarea
                name="lectureDesc"
                placeholder="Enter Lecture Description"
                {...register("lectureDesc", { required: true })}
              className="w-full md:min-h-[130px] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
              />
              {
                errors.lectureDesc && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">Please enter lecture description</span>
                )
              }
            </label>
          </div>
          {/* dont have to show button while we are viewing the lecture  */}
          {
            !view && (
              <div className="flex justify-end">
                <IconButton text={loading ? "Loading...." : edit ? "Save Changes" : "Save"} 
                  customClasses={"px-8 py-4 bg-yellow-50 text-richblack-900 font-semibold rounded-xl"}
                />
              </div>

            )
          }     
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
