import React, { useEffect ,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import IconButton from '../../common/IconButton';
import CouresesTable from './InstructorCourses/CouresesTable';
import { VscAdd } from 'react-icons/vsc';

const MyCourses = () => {

    const {token} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const [courses , setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async() => {
            const result = await fetchInstructorCourses(token);
            if(result){
                setCourses(result)
            }
        }

        fetchCourses();
    },[])

  return (
    <div>
        <div className="mb-14 flex items-center justify-between" >
            <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
            {/* PLUS ICON LEFT  */}
            <IconButton
                text={"Add Course"}
                onClick={() => navigate("/dashboard/add-course")}
                customClasses={
              "border px-[12px] py-[8px] border-yellow-25 text-yellow-25 flex items-center  gap-x-2 font-semibold"
            }
            >
                <VscAdd/>
            </IconButton>
        </div>

        {
            courses && <CouresesTable courses={courses} setCourses={setCourses}/>
        }
    </div>
  )
}

export default MyCourses