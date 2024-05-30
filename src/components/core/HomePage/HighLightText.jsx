import React from 'react'

const HighLightText = ({text}) => {
  return (
    // apply gradient here 
    <span className='font-bold text-richblue-200'>
        {" "}
        {text}
    </span>
  )
}

export default HighLightText