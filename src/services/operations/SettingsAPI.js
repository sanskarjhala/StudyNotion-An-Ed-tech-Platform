import toast from "react-hot-toast";
import { settingsEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authApi";



const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  DELETE_PROFILE_API,
  CHANGE_PASSWORD_API,
} = settingsEndpoints;


export function updatedDisplayPicture(token, formData, navigate) {
  return async (dispatch) => {
    const toastID = toast.loading("Updating...");
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("UPDATED PROFILE PICTURE API RESPONSE : ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile Picture Updated Sucessfully");
      dispatch(setUser({...response.data.data}));
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("UPDATE DISPLAY PICTURE API ERROR : ", error);
      toast.error("Could not update Profile picture ");
    }
    toast.dismiss(toastID);
  };
}


//!!!!!!!!!!!!!!!!!!!!!!! HAS TO BE CHECKED !!!!!!!!!!!!!!!!!!!!!!!!!
export function updateProfile(token, formData , navigate) {
 
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
     
      console.log("UPDATE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Profile Updated Successfully");
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.updatedUserDetails.lastname}`;

      console.log("USER IMAGE : " , userImage)
      dispatch(
        setUser(response.data.data)
      );
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Update Profile");
    }
    toast.dismiss(toastId);
  };
}


export async function changePassword ( token , formData){
    const toastId = toast.loading("Updating...")
    try {
      const response = await apiConnector(
        "POST",
        CHANGE_PASSWORD_API,
        formData,
        {
          Authorization : `Bearer ${token}`
        }
      )
      console.log("CHANGE PASSWORD API RESPONSE : " , response);

      if(!response.data.success){
        throw new Error(response.data.message);
      }

      toast.success("Password Updated Succesfully")
    } catch (error) {
      console.log("CHANGE PASSWORD API ERROR....  " , error)
      toast.error("Cannot update password, try again")
    }
    toast.dismiss(toastId);
}

export function deleteProfile(token, navigate){
 
  return async(dispatch) => {
    const toastId = toast.loading("Deleting...");
    try {
      const response = await apiConnector("DELETE" , DELETE_PROFILE_API , null , {
        Authorization : `Bearer ${token}`
      })
      console.log("DELETE PROFILE API RESPOONSE : " , response)
      
      if(!response.data.success){
        throw new Error(response.data.message);
      }
  
      toast.success("Account deleted succesfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE PROFILE API ERROR ........... " , error)
      toast.error("Cannot delete your account")
    }
    toast.dismiss(toastId)
  }
}