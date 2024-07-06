import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { Player } from "video-react";
// import "~video-react/dist/video-react.css";
import { AiFillPlayCircle } from "react-icons/ai";
import IconButton from "../../common/IconButton";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData) return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        //let assume all the fields are present
        const filteredData = courseSectionData.filter(
          (section) => section?._id === sectionId
        );

        const filteredVideoData = filteredData?.[0].subSection.filter(
          (data) => data?._id === subSectionId
        );

        setVideoData(filteredVideoData);
        setVideoEnded(false);
      }
    };
    setVideoSpecificDetails();
  }, [
    courseEntireData,
    courseSectionData,
    location.pathname,
    subSectionId,
    sectionId,
  ]);

  const isFirstVideo = () => {
    //the first section and first subSection is at 0th index
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data?._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSectionId.findIndex((data) => data?._id === subSectionId);

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data?._id === sectionId
    );

    const numberOfSubSections =
      courseSectionData[currentSectionIndex]?.subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSectionId.findIndex((data) => data?._id === subSectionId);

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === numberOfSubSections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data?._id === sectionId
    );

    const numberOfSubSections =
      courseSectionData[currentSectionIndex]?.subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSectionId.findIndex((data) => data?._id === subSectionId);

    if (currentSubSectionIndex !== numberOfSubSections - 1) {
      //same section ki next video me jao
      const nextSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection[
          currentSubSectionIndex + 1
        ]._id;
      //iss video par jao
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      //different section first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[nextSubSectionId]?.subSection[0]._id;
      //navigate to this video
      navigate(
        `view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const goToPreviousVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data?._id === sectionId
    );

    const numberOfSubSections =
      courseSectionData[currentSectionIndex]?.subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSectionId.findIndex((data) => data?._id === subSectionId);

    if (currentSubSectionIndex !== 0) {
      //same section , previous video
      const previousSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]._id;
      //navigate to this video
      navigate(
        `view-course/${courseId}/section/${sectionId}/sub-section/${previousSubSectionId}`
      );
    } else {
      //diffrent section ,last video
      const previousSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const previousSubSectionLength =
        courseSectionData[currentSectionIndex - 1]?.subSection.length;
      const previousSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          previousSubSectionLength - 1
        ]._id;
      //navigate toh this video
      navigate(
        `view-course/${courseId}/section/${previousSectionId}/sub-section/${previousSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    //dummy code
    setLoading(true);
    const result = await markLectureAsComplete(
      {
        courseId: courseId,
        subSection: subSectionId,
      },
      token
    );

    //update state
    if (result) {
      dispatch(updateCompletedLectures(subSectionId));
    }

    setLoading(false);
  };

  return (
    <div>
      {!videoData ? (
        <div>No data Found</div>
      ) : (
        <div>
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={() => setVideoEnded(true)}
            src={videoData?.videoUrl}
          >
            <AiFillPlayCircle />

            {videoEnded && (
              <div>
                {!completedLectures.includes(subSectionId) && (
                  <IconButton
                    disabled={loading}
                    onClick={() => handleLectureCompletion()}
                    text={loading ? "Loading..." : "Mark as completed"}
                  />
                )}

                <IconButton
                  disabled={loading}
                  onClick={() => {
                    if (playerRef?.current) {
                      playerRef?.current?.seek(0);
                      setVideoEnded(false);
                    }
                  }}
                  text={"Rewatch"}
                />

                <div>
                  {!isFirstVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToPreviousVideo}
                      className="blackButton"
                    >
                      Prev
                    </button>
                  )}
                  {!isLastVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToNextVideo}
                      className="blackvideo"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </Player>
        </div>
      )}

      <h1>
        {videoData?.title}
      </h1>
      <p>
        {videoData?.description}
      </p>
    </div>
  );
};

export default VideoDetails;
