import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CountryCode from "../../../../data/countrycode.json";
import { useNavigate } from "react-router-dom";
import IconButton from "../../../common/IconButton";
import toast from "react-hot-toast";
import { updateProfile } from "../../../../services/operations/SettingsAPI";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateProfileForm = async (data) => {

    console.log(data)
        try {
            dispatch(updateProfile(token, data , navigate))  
        } catch (error) {
            toast.error("Something went wrong")
        }
  }


  return (
    <>
      <form 
        onSubmit={handleSubmit(updateProfileForm)}
      className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <h1 className="text-2xl text-richblack-5 font-medium">
          Profile Information
        </h1>

        <div className="flex flex-col  gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label className="">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                First Name
              </p>
              <input
                type="text"
                placeholder="Enter first name"
                name="firstName"
                {...register("firstName", { required: true })}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-pink-200">
                  Please enter your first name
                </span>
              )}
            </label>
          </div>

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Last Name
              </p>
              <input
                type="text"
                placeholder="Enter first name"
                name="lastname"
                {...register("lastname", { required: true })}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                defaultValue={user?.lastname}
              />
              {errors.lastname && (
                <span className="-mt-1 text-[12px] text-pink-200">
                  Please enter your last name
                </span>
              )}
            </label>
          </div>
        </div>

        <div className="flex flex-col  gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label className="">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Date of Birth
              </p>
              <input
                type="date"
                name="dateOfBirth"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-pink-200">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </label>
          </div>

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Gender
              </p>

              <select
                type="text"
                placeholder="Select your gender"
                name="gender"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-600 p-[14px] text-richblack-5"
              >
                {genders.map((element, index) => {
                  return (
                    <option key={index} value={element}>
                      {element}
                    </option>
                  );
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-pink-200">
                  Please select gender
                </span>
              )}
            </label>
          </div>
        </div>

        <div className="flex flex-col  gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <div className="flex flex-col">
              <label
                className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
                htmlFor="phoneNumber"
              >
                Contact Number
              </label>

              <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-4">
                <select
                  type="text"
                  name="dropdown"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[80px] rounded-[0.85rem]  p-[12px] bg-richblack-600 text-richblack-5"
                  {...register("countryCode", { required: true })}
                >
                  {CountryCode.map((code, index) => {
                    return (
                      <option key={index} value={code.code}>
                        {code.code}-{code.country}
                      </option>
                    );
                  })}
                </select>

                <input
                  type="number"
                  placeholder="Enter Phone Number"
                  id="phoneNumber"
                  name="contactNumber"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="rounded-[0.85rem] p-[12px] bg-richblack-600 text-richblack-5 w-full"
                  {...register("contactNumber", {
                    required: { value: true, message: "Enter Phone Number" },
                    maxLength: { value: 10, message: "Invalid Phone Number" },
                    minLength: { value: 8, message: "Invalid Phone Number" },
                  })}

                  defaultValue={user?.additionalDetails?.contactNumber}
                />

    
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                About
              </p>

              <input
                type="text"
                placeholder="Enter bio details"
                name="about"
                {...register("about" , {required:true})}
                defaultValue={user?.additionalDetails?.about}
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="rounded-[0.85rem] p-[12px] bg-richblack-600 text-richblack-5 w-full"
              />  
                  
            </label>
          </div>



        </div>

        <div className="flex justify-center lg:justify-end gap-4 lg:mr-5">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconButton 
          type="submit" 
          text="Save" 
          customClasses={"cursor-pointer rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-800"}/>
        </div>
      </form>
    </>
  );
};

export default EditProfile;
