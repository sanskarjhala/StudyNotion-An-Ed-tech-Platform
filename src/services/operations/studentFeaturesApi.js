import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
import razorpayLogo from "../../assets/Logo/rzp_logo.png"

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

async function sendSuccessfullPaymentEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount: amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );


  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR...... " , error)
  }
}


//function for verifying the payment
async function verifyThePayment(bodyData , token , navigate , dispatch ){
    const toastId = toast.loading("Loading...");
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector("POST" , COURSE_VERIFY_API , bodyData , 
            {
                Authorization:`Bearer ${token}`
            }
        )

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Payment Successfull");
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart());
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR......." , error);
        toast.error("Could Not verify payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}

export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch,
) {
  const toastId = toast.loading("Loading...");
 
  try {
    //load the script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay Sdk failed to Load");
      return;
    }
   
    // initiate the order
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("ORDER RESPONSE " , orderResponse)

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }
   

    //options
    const options = {
      key: process.env.RAZORPAY_KEY,
      currency: orderResponse.data.message.currency,
      amount: `${orderResponse.data.message.amount}`,
      order_id: orderResponse.data.message.id,
      name: "StudyNotion",
      description: "Thanku for purachasing the course",
      image:razorpayLogo,
      prefill: {
        name: `${userDetails.firstName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        //send successfull mail
        sendSuccessfullPaymentEmail(
          response,
          orderResponse.data.message.amount,
          token
        );
        //verify Payment
        verifyThePayment({ ...response, courses }, token, navigate, dispatch);
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed" , function(response){
      toast.error("Oops! Payment failed");
      console.log(response.error)
    })
    
  } catch (error) {
    console.log("PAYMENT API ERROR........", error);
    toast.error("Could Not make the Payment !!!");
  }
  toast.dismiss(toastId);
}
