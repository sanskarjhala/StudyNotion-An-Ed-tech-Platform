import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import HighLightText from '../components/core/HomePage/HighLightText'

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className='relative mx-auto w-11/12 flex flex-col items-center text-white justify-between'>
        <Link to={"/signup"}>
          <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
          transition duration-200 hover:scale-95 w-fit'>
            <div className='flex items-center rounded-full px-10 py-[5px] gap-2 group-hover:bg-richblack-900'>
              <p>Become an Instructor</p>
              <FaArrowRight/>
            </div>
          </div>
        </Link>

        <div className='text-center text-4xl font-semibold'>
          Empower Your Future With <HighLightText text={"Coding Skills"}/>
        </div>
      </div>


      {/* Section 2 */}
      {/* Section 3 */}
      {/* Section 4 */}
    </div>
  )
}

export default Home