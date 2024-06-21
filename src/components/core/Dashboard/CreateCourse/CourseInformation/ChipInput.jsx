import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const ChipInput = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getvalues,
}) => {
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    setValue(name, tagList);
  }, [tagList]);

  useEffect(() => {
    register(name, { required: true });
  });

  const addTagHandler = () => {
    if (tag) {
      setTagList([...tagList, tag]);
      console.log("TAG LIST : ", tagList);
    }
  };

  const removeTagHandler = (index) => {
    const updatedTagList = [...tagList];
    updatedTagList.splice(index, 1);
    setTagList(updatedTagList);
  };

  return (
    <div className="">
      {tagList.length > 0 && (
        <div className="flex gap-x-4 text-white max-w-[200px]">
          {tagList.map((tag, index) => {
            return (
              <span key={index} className="">
                {tag}
                <button
                  type="button"
                  className="font-medium text-yellow-900"
                  onClick={removeTagHandler}
                >
                  <RxCross2 className="text-yellow-50" />
                </button>
              </span>
            );
          })}
        </div>
      )}
      <div>
        <label className="space-y-1">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            {label} <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            placeholder={placeholder}
            name={name}
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
          />
          <button
            type="button"
            onClick={addTagHandler}
            className="font-semibold text-yellow-50"
          >
            Add
          </button>
        </label>
      </div>

      {errors[name] && (
        <span className="text-pink-200">{label} is required</span>
      )}
    </div>
  );
};

export default ChipInput;
