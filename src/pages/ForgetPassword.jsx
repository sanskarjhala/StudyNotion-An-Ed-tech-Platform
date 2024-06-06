import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi"
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authApi";


const ForgetPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(getPasswordResetToken(email , setEmailSent))
  };

  return (
    <div className="w-11/12 max-w-maxContent mx-auto md:mt-44">
      <div className="w-[30%] mx-auto flex flex-col">
      {loading ? (
        <div>loading........</div>
      ) : (
        <div className="space-y-3">
          <h1 className="text-richblack-5 text-4xl font-bold">{!emailSent ? "Reset your password" : "Check email"}</h1>

          <p className="text-richblack-300 text-base">
            {!emailSent
              ? `Have no fear. We'll email you 
                        instructions to reset your password. 
                        If you dont have access to your email we can try account recovery`
              : `We have sent the reset email to
                    ${email}`}
          </p>

          <form onSubmit={submitHandler}>
            {!emailSent ? (
              <label>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email address <sup className="text-pink-200 text-[12px]">*</sup>
                </p>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <button
                    className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                >
                    Send Mail
                </button>
              </label>
            ) :
            (<button
                    className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                >
                    Resend Email
                </button>)}
          </form>


          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>

        </div>
      )}
      </div>
    </div>
  );
};

export default ForgetPassword;
