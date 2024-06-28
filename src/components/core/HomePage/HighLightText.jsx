import React from 'react'

const HighLightText = ({text}) => {
  return (
    // apply gradient here 
    <span className='font-bold text-blue-200'>
        {" "}
        {text}
    </span>
  )
}

export default HighLightText