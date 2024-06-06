import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../services/operations/authApi";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const submitHandler = (event) => {
    event.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    <div className="w-11/12 max-w-maxContent mx-auto">
      {loading ? (
        <div className="text-white">Loading ........</div>
      ) : (
        <div  className="w-[40%] mx-auto flex flex-col">
          <div className="text-richblack-5 md:mt-44">
            <h1 className="text-4xl font-bold mb-4 ">Choose new password</h1>
            <p className="text-[16px] text-richblack-300">Almost done. Enter your new password and youre all set.</p>

            <div className="my-4">
              <form onSubmit={submitHandler} className="flex flex-col gap-y-4 ">
                <label className="relative">
                  <p>
                    New password <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                </label>

                <label className="relative">
                  <p >
                    Confirm password <sup  className="text-pink-200">*</sup>
                  </p>
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={formData.confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange}
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                </label>

                <button className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                  Reset Password
                </button>
              </form>

              <div className="mt-6 flex items-center justify-between">
                <Link to="/login">
                  <p className="flex items-center gap-x-2 text-richblack-5">
                    <BiArrowBack /> Back To Login
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
