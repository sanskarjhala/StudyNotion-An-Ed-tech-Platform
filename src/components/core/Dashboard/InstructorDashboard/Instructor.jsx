import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { Link } from 'react-router-dom';
import ChartInstructor from './ChartInstructor';



const Instructor = () => {

    const [loading , setLoading] = useState(false);
    const [instructorData ,setInstructorData] = useState(null);
    const [courses , setCourses] = useState([]);

    const {token} = useSelector(state => state.auth);
    const {user} = useSelector(state => state.profile);


    useEffect(() => {
        const getCourseDataWithStats = async() => {
            setLoading(true);
            const InstructorApiData  = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);

            console.log("Instructor api data" , InstructorApiData);

            if(InstructorApiData.length){
                setInstructorData(instructorData);
            }
                            
            if(result){
                setCourses(result);

            }
            setLoading(false);
        }

        getCourseDataWithStats()
    } , [])


    const totalAmount = instructorData?.reduce((acc , curr) => acc + curr.totalAmountGenerated, 0 );
    const totalStudents = instructorData?.reduce((acc ,curr) => acc + curr.totalStudentsEnrolled , 0);


  return (
    <div className='text-richblack-5'>
        <div>
            Hi,{user.firstName}
            <p>Lets's something new</p>

            {
                loading ? <div className='spinner'></div>
                : courses.length > 0
                ? (
                  <div>
                  <div>
                         <ChartInstructor courses={instructorData}/>
                         <div>
                            <p>Statistics</p>
                            <div>
                                <p>Total Courses</p>
                                <p>{courses.length}</p>
                            </div>

                            <div>
                                <p>Total Students</p>
                                <p>{totalStudents}</p>
                            </div>

                            <div>
                                <p>Total Income</p>
                                <p>{totalAmount}</p>
                            </div>
                         </div>
                    </div>

                    {/* Courses card of particular instructor */}
                    <div>
                      <div>
                            <p>Your Courses</p>
                            <Link to={"/dashboard/my-courses"}>
                                <p>View All</p>
                            </Link>
                      </div>

                      <div>
                        {
                            courses.slice(0,3).map(course => (
                                <div>
                                    <img
                                        src={course?.thumbnail}
                                        alt='Course Image'
                                    />
                                    <div>
                                        <p>{course.courseName}</p>
                                        <div>
                                            <p>{course.studentsEnrolled.length}</p>
                                            <p>|</p>
                                            <p>Rs. {course?.price}</p>    
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                      </div>


                    </div>


                  </div>
                )
                : (<div>
                    <p>You have not created any courses yet </p>
                    <Link to={"/dashboard/add-Course"}>
                        Create a course
                    </Link>
                </div>)
            }
        </div>
    </div>
  )
}

export default Instructor