import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../apis";

const { CATALOGPAGEDATA_API } = catalogData;

export const getCategoryPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("POST", CATALOGPAGEDATA_API, {
      categoryId: categoryId,
    });

    console.log("CATEGORY PAGE DATA API RESPONSe ", response);
    if(!response.data.success){
        throw new Error("COuld not fetch category page data");
    }

    result = response?.data;
    
  } catch (error) {
    console.log("CATEGORY PAGE DATA API ERROR........... " , error)
    toast.error(error.message);
    result = error?.response?.data
  }
  toast.dismiss(toastId);
  return result;
};
