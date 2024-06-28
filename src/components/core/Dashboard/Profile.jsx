import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { formattedDate } from "../../../utils/dateFormatter";
import IconButton from "../../common/IconButton";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  console.log("USER : " , user)
  const navigate = useNavigate();

  return (
    <>
      <h1 className="mb-14 text-xl lg:text-3xl font-bold text-richblack-5">My Profile</h1>
      <div className="flex max-[600px]:flex-col max-[600px]:gap-y-5 items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex max-[600px]:flex-col max-[600px]:gap-y-5 flex-wrap items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1 max-[600px]:text-center">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastname}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconButton
          text="Edit"
          onClick={() => {
            navigate("/dashboard/settings");
          }}
          customClasses={
            "bg-yellow-50 font-semibold flex flex-row-reverse gap-x-1 sm:gap-x-2 items-center  px-6 py-2 sm:px-8 sm:py-3 rounded-xl"
          }
        >
          <RiEditBoxLine className="text-xl" />
        </IconButton>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex max-[600px]:flex-col  w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconButton
            text="Edit"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
            customClasses={
             "bg-yellow-50 font-semibold hidden lg:flex flex-row-reverse gap-x-1 sm:gap-x-2 items-center  px-6 py-2 sm:px-8 sm:py-3 rounded-xl"
            }
          >
            <RiEditBoxLine className="text-xl" />
          </IconButton>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium max-[600px]:text-center `}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconButton
            text="Edit"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
            customClasses={
             "bg-yellow-50 font-semibold hidden lg:flex flex-row-reverse gap-x-1 sm:gap-x-2 items-center  px-6 py-2 sm:px-8 sm:py-3 rounded-xl"
            }
          >
            <RiEditBoxLine className="text-xl" />
          </IconButton>
        </div>
        <div className="flex flex-col lg:flex-row max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastname}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
