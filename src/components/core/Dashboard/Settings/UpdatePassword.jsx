import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "../../../common/IconButton";
import { changePassword } from "../../../../services/operations/SettingsAPI";

const UpdatePassword = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formSubmition = async (data) => {
    try {
      console.log("FORM DATA : ", data);
      dispatch(changePassword(token , data))
    } catch (error) {
      console.log("ERROR OCUURED WHILE SUBMITTINg FORM");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmition)}
      className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12"
    >
      <h1 className="text-2xl text-richblack-5 font-medium">Password</h1>

      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="relative flex flex-col gap-2 lg:w-[48%]">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Current Password
            </p>

            <input
              type={showCurrentPassword ? "text" : "password"}
              name="oldPassword"
              placeholder="Enter old password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
              {...register("oldPassword", { required: true })}
            />
            <span
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              onClick={() => {
                setShowCurrentPassword((prev) => !prev);
              }}
            >
              {showCurrentPassword ? (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {errors.oldPassword && (
              <span className="-mt-1 text-[12px] text-pink-200">
                Please enter old password
              </span>
            )}
          </label>
        </div>

        <div className="relative flex flex-col gap-2 lg:w-[48%]">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              New Password
            </p>

            <input
              type={showConfirmPassword ? "text" : "password"}
              name="newPassword"
              placeholder="Enter old password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
              {...register("newPassword", { required: true })}
            />
            <span
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              onClick={() => {
                setShowConfirmPassword((prev) => !prev);
              }}
            >
              {showConfirmPassword ? (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {errors.newPassword && (
              <span className="-mt-1 text-[12px] text-pink-200">
                Please enter confirm password
              </span>
            )}
          </label>
        </div>
      </div>

      <div className="flex gap-x-4 px-8 py-4 justify-end">
        <button
          className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          onClick={() => {
            navigate("/dashboard/my-profile");
          }}
        >
          Cancel
        </button>
        <IconButton
          type={"submit"}
          text={"Update"}
          customClasses={
            "cursor-pointer rounded-md bg-yellow-50   py-2 px-5 font-semibold text-richblack-900"
          }
        />
      </div>
    </form>
  );
};

export default UpdatePassword;
