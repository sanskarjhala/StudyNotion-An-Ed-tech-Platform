import copy from 'copy-to-clipboard';
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';

const CourseDetailsCard = ({course , setConfirmationModal , handleBuyCourse}) => {

    const {
        thumbnail:thumbnail,
        price
    } = course;

    const {user} = useSelector(state => state.profile);
    const {token} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("YOu are an Instructor, You can't buy the course")
        }
        if(token){
            dispatch(addToCart())
            return;
        }
    }

    const handleShare = () => {
       copy(window.location.href);
       toast.success("Link Copied to Clipboard")
    }



  return (
    <div>
        <img src={thumbnail} alt='thumnail' className='max-h-[300px] min-h-[180px]'/>
        <div>
            Rs. {price}
        </div>
        <div>
            <button
                onClick={
                    token && user && course?.studentsEnrolled.includes(user?._id)
                    ? () => navigate("/dashboard/enrolled-courses")
                    : () => handleBuyCourse
                }
            >
                {
                    token && user && course?.studentsEnrolled.includes(user?._id) ? "Go To Course" : "Buy Course"
                }
            </button>


         {  token && 
            (!course?.studentsEnrolled.includes(user._id)) && (
                <button
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            )
         }
         {
            !token && (
                <button
                    onClick={()=> setConfirmationModal({
                            text1:"You Are not Logged In",
                            text2:"Please first login to add course to cart",
                            btn1Text:"Login",
                            btn2Text:"Cancel",
                            btn1Handler: () => navigate("/login"),
                            btn2Handler: () => setConfirmationModal(null),
                        })}


                >
                    Add to Cart
                </button>
            )
         }
        </div>

        <div>
            <p>30-Day Money back Guarantee</p>
            <p>
                This Course includes
            </p>
            <div className='flex flex-col gap-y-2'>
                {
                    course?.instructions.map((item , index) => (
                        <p key={index}>
                            <span>{item}</span>
                        </p>
                    ))
                }
            </div>
        </div>

        <div>
            <button
                onClick={handleShare}
            >
                {/* ICON */}
                Share
            </button>
        </div>
    </div>
  )
}

export default CourseDetailsCard