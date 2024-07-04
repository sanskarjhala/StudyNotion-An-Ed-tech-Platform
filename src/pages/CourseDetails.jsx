import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { setCourse } from "../slices/courseSlice";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import ConfirmationModal from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/RatingStars";
import { formatDate } from "../services/formatDate";
import { buyCourse } from "../services/operations/studentFeaturesApi";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";

const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  useEffect(() => {
    const getCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        console.log("Printing CourseData-> ", result);
        setCourseData(result);
      } catch (error) {
        console.log("Could not fetch coursse details");
      }
    };
    getCourseFullDetails();
  }, [courseId]);

  const [avgReviewCount, setAverageReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(
      courseData?.data?.courseDetails.ratingAndReviews
    );
    setAverageReviewCount(count);
  }, [courseData]);

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [courseData]);

  const handleBuyCourse = () => {
    console.log("clicked");
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "you are not Logged in",
      text2: "Please login to purchase the course",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const [isActive, setIsActive] = useState(Array(0));
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((e) => e != id)
    );
  };

  if (loading || !courseData) {
    return <div>Loading...</div>;
  }

  if (!courseData.success) {
    return (
      <div>
        <Error />
      </div>
    );
  }
  const {
    // _id: _id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseData.data?.courseDetails;

  return (
    <div className="flex flex-col  text-white">
      <div className="relative flex flex-col justify-start">
        <p>{courseName}</p>
        <p>{courseDescription}</p>
        <div className="flex gap-x-2 ">
          {/* <span>{avgReviewCount}</span> */}
          <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
          {/* <span>{`${ratingAndReviews.length} reviews`}</span> */}
          <span>{`${studentsEnrolled.length} student enrolled`}</span>
        </div>

        <div>
          <p>Created By</p>
          {/* <p>Created By {`${instructor?.firstName} ${instructor?.lastname}`}</p> */}
        </div>

        <div className="flex gap-x-3">
          <p>Created At {formatDate(createdAt)}</p>
          <p>English</p>
        </div>

        <div>
          <CourseDetailsCard
            course={courseData?.data?.courseDetails}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}
          />
        </div>
      </div>

      <div>
        <p>What you will Learn</p>
        <div>{whatYouWillLearn}</div>
      </div>

      <div>
        <div>
          <p>Course Content</p>
        </div>
        <div>
          <div>
            <span>{courseContent.length} sections</span>
            <span> {totalNoOfLectures} lectures</span>
            <span>{courseData?.data?.totalDuration}</span>
          </div>

          <div>
            <button onClick={() => setIsActive([])}>
              Collapse all section
            </button>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseDetails;
