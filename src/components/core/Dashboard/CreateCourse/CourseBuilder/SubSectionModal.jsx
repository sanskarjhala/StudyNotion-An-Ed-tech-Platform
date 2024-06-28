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
    <div>
      <div>
        <div>
          <p>
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture{" "}
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross1 />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div>
            <label>
              <p>
                Lecture Title <sup>*</sup>
              </p>
              <input
                name="lectureTitle"
                placeholder="Enter Lecture Title"
                {...register("lectureTitle", { required: true })}
              />
              {errors.lectureTitle && <span>Lecture title is required</span>}
            </label>
          </div>

          <div>
            <label>
              <p>
                Lecture Description<sup>*</sup>
              </p>
              <textarea
                name="lectureDesc"
                placeholder="Enter Lecture Description"
                {...register("lectureDesc", { required: true })}
                className="w-full min-h-[130px]"
              />
              {
                errors.lectureDesc && (
                  <span>Please enter lecture description</span>
                )
              }
            </label>
          </div>
          {/* dont have to show button while we are viewing the lecture  */}
          {
            !view && (
              <div>
                <IconButton text={loading ? "Loading...." : edit ? "Save Changes" : "Save"}/>
              </div>

            )
          }     
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
