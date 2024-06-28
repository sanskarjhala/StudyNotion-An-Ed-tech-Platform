import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSolidDownArrow } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { setCourse } from "../../../../../slices/courseSlice";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";

const NestedView = ({ handlerChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    console.log("DELETE SECTION BUTTON CLICKED")
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    });

    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    console.log("SUBSECTION_ID : " , subSectionId);
    const result = await deleteSubSection({
      subSectionId,
      sectionId,
      token,
    });

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) => section._id === sectionId ? result : section)
      const updatedCourse = {...course , courseContent : updatedCourseContent}
      dispatch(setCourse(updatedCourse));
    }

    setConfirmationModal(null);
  };

  return (
    <div className="text-richblack-5">
      <div>
        {course?.courseContent?.map((section) => {
          return (
            <details key={section._id} open>
              <summary className="flex items-center justify-between gap-x-3 border-b-2">
                <div className="flex items-center gap-x-2">
                  <RxDropdownMenu />
                  <p>{section.sectionName}</p>
                </div>

                <div className="flex items-center ">
                  <button
                    onClick={() => handlerChangeEditSectionName(section._id , section.sectionName)}
                  >
                    <MdEdit />
                  </button>

                  <button
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Delete This section",
                        text2:
                          "All the lecture in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteSection(section._id),
                        btn2handler: () => setConfirmationModal(null),
                      });
                    }}
                  >
                    <RiDeleteBin6Line />
                  </button>
                  <span>|</span>

                  <BiSolidDownArrow className="text-lg text-richblack-300" />
                </div>
              </summary>

              <div>
                {section?.subSection?.map((data) => {
                  return (
                    <div
                      key={data?._id}
                      onClick={() => setViewSubSection(data)}
                    >
                      <div className="flex items-center gap-x-2">
                        <RxDropdownMenu />
                        <p>{data.title}</p>
                      </div>

                      <div onClick={(e) =>e.stopPropagation()}>
                        <button
                          onClick={() =>
                            setEditSubSection({
                              ...data,
                              sectionId: section._id,
                            })
                          }
                        >
                          <MdEdit />
                        </button>

                        <button
                          onClick={() =>
                            setConfirmationModal({
                              text1: "Delete This sub section",
                              text2: "Selected Lecture will be Deleted",
                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btn1Handler: () =>
                                handleDeleteSubSection(data._id, section._id),
                              btn2Handler: () => setConfirmationModal(null),
                            })
                          }
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </div>
                  );
                })}
                <button onClick={() => setAddSubSection(section._id)}>
                  <AiOutlinePlus />
                  <p>Add Lecture</p>
                </button>
              </div>
            </details>
          );
        })}
      </div>
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <div></div>
      )}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default NestedView;
