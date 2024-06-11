import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../../data/countrycode.json";
import { useDispatch } from "react-redux";
import { contactUs } from "../../../services/operations/contactApi";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState({});
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    const { firstname, lastname, email, message, phoneNo, countryCode } = data;
    dispatch(
      contactUs(firstname, lastname, email, message, phoneNo, countryCode)
    );
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form
      className="flex flex-col w-full gap-y-4"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="lg:flex gap-x-8">
        <label>
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 font-inter">
            First Name
          </p>
          <input
            type="text"
            placeholder="Enter first name"
            name="firstname"
            className="rounded-[0.85rem] p-[12px] bg-richblack-800 text-richblack-5 w-full"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className='className="mb-1 text-[0.875rem] leading-[1.375rem] text-pink-200 font-inter'>
              Please Enter your first Name
            </span>
          )}
        </label>

        <label>
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 font-inter">
            Last name
          </p>
          <input
            type="text"
            placeholder="Enter last name"
            name="lastname"
            className="rounded-[0.85rem] p-[12px] bg-richblack-800 text-richblack-5 w-full"
            {...register("lastname")}
          />
        </label>
      </div>

      <label>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 font-inter">
          Email
        </p>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          className="rounded-[0.85rem] p-[12px] bg-richblack-800 text-richblack-5 w-full"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className='className="mb-1 text-[0.875rem] leading-[1.375rem] text-pink-200 font-inter'>
            Please enter your email
          </span>
        )}
      </label>

      <div className="flex flex-col ">
        <label
          className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 font-inter"
          htmlFor="phoneNumber"
        >
          Phone Number
        </label>

        <div className="flex gap-x-4">
          <select
            name="dropdown"
            className="w-[80px] rounded-[0.85rem]  p-[12px] bg-richblack-800 text-richblack-5"
            {...register("countryCode", { required: true })}
          >
            {CountryCode.map((code, index) => {
              return (
                <option key={index} value={code.code}>
                  {code.code} - {code.country}
                </option>
              );
            })}
          </select>

          <input
            type="number"
            placeholder="Enter Phone Number"
            id="phoneNumber"
            name="phoneNo"
            className="rounded-[0.85rem] p-[12px] bg-richblack-800 text-richblack-5 w-full"
            {...register("phoneNo", {
              required: { value: true, message: "Enter Phone Number" },
              maxLength: { value: 10, message: "Invalid Phone Number" },
              minLength: { value: 8, message: "Invalid Phone Number" },
            })}
          />
        </div>
      </div>

      <label>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 font-inter">
          message
        </p>
        <textarea
          name="message"
          placeholder="Enter your message"
          cols={30}
          rows={7}
          className="rounded-[0.85rem] p-[12px] bg-richblack-800 text-richblack-5 w-full"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className='className="mb-1 text-[0.875rem] leading-[1.375rem] text-pink-200 font-inter'>
            Please enter your message.
          </span>
        )}
      </label>

      <button className="bg-yellow-50 text-black font-semibold w-full p-[12px] rounded-lg text-[16px]">
        Send Message
      </button>
    </form>
  );
};

export default ContactUsForm;
