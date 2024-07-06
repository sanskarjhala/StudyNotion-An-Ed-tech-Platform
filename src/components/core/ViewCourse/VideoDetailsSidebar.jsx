import React, { useEffect, useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconButton from "../../common/IconButton";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState(null);
  const [videoBarActive, setVideoBarActive] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalnoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData) {
        return;
      }

      //find current section index (for highlighting)
      const currentSectionIndex = courseSectionData?.findIndex(
        (data) => data._id === sectionId
      );
      //finding current subSection index
      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.findIndex((data) => data._id === subSectionId);

      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;

      //setting current section here
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      //setting current subSection here
      setVideoBarActive(activeSubSectionId);
    };

    setActiveFlags();
  }, [courseEntireData, courseSectionData, location.pathname , subSectionId , sectionId]);

  return (
    <>
      <div>
        {/* for buttons and headings */}
        <div>
          {/* for buttonds */}
          <div>
            <div onClick={() => navigate("/dashboard/enrolled-courses")}>
              <MdArrowBackIosNew />
            </div>
            <div>
              <IconButton
                text={"Add review"}
                onClick={() => setReviewModal(true)}
              />
            </div>
          </div>

          {/* for heading and Title */}
          <div>
            <p>{courseEntireData?.courseName}</p>
            <p>
              {completedLectures?.length} / {totalnoOfLectures}
            </p>
          </div>
        </div>

        {/* for sections and sub Section */}
        <div>
          {courseSectionData.map((section, index) => (
            <div key={index} onClick={() => setActiveStatus(section?._id)}>
              {/*Section */}
              <div>
                <div>{section?.sectionName}</div>
                {/* Have to add row icon which gradully changes with open and close*/}
              </div>

              {/* sub-Sections */}
              <div>
                {activeStatus === section?._id && (
                  <div>
                    {section?.subSection?.map((topic, index) => (
                      <div
                        className={`flex gap-3 p-3 ${
                          videoBarActive === topic?._id
                            ? "bg-yellow-50 text-richblack-900"
                            : "bg-richblack-900 text-white"
                        }`}
                        key={index}
                        onClick={() => {
                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                          );
                          setVideoBarActive(topic?._id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(topic._id)}
                          onChange={() => {}}
                        />

                        <span>{topic?.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;
