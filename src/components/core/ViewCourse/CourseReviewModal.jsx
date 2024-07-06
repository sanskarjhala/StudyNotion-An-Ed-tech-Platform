import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import IconButton from "../../common/IconButton";
import { createRating } from "../../../services/operations/courseDetailsAPI";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", "");
  }, []);

  const ratingChange = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );

    setReviewModal(false);
  };

  return (
    <div>
      <div>
        {/* modal header */}
        <div>
          <p>Add review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross1 />
          </button>
        </div>

        {/* MOdal Body */}
        <div>
          <div>
            <img
              src={user?.image}
              alt="user Image"
              className="aspect-square w-[50px] rounded-full"
            />
            <div>
              <p>
                {user?.firstName} {user?.lastname}
              </p>
              <p>Posting publically</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <ReactStars
              count={5}
              onChange={ratingChange}
              size={24}
              activeColor="#ffd700"
            />

            <div>
              <label>
                <p>Add your experience</p>
                <textarea
                  name="courseExperience"
                  placeholder="Add your experience"
                  {...register("courseExperience", { required: true })}
                  className="form-style min-h-[130px]"
                />
                {errors.courseExperience && (
                  <span>please enter your experience</span>
                )}
              </label>
            </div>

            {/* cancle and save button */}
            <div>
              <button onClick={() => setReviewModal(false)}>cancle</button>

              <IconButton text={"Save"} type={"submit"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;
