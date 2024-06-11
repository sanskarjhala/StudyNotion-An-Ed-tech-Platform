import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { contactUsApi } from "../apis";

const { CONTACT_US_API } = contactUsApi;

export function contactUs(
    firstname,
    lastname,
    email,
    message,
    phoneNo,
    countryCode,
) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", CONTACT_US_API, {
        firstname,
        lastname,
        email,
        message,
        phoneNo,
        countryCode,
      });

      if(!response.data.success){
        throw new Error(response.data.message)
      }

      toast.success("Mail sent Successfully")

    } catch (error) {
        console.log("ERROR OCCURED " , error)
        toast.error("PLEASE TRY AGAIN LATER")
    }
  };
}
