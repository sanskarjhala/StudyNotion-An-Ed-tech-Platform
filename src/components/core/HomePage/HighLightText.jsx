import React from 'react'

const HighLightText = ({text}) => {
  return (
    // apply gradient here 
    <span className='font-bold text-pink-400'>
        {" "}
        {text}
    </span>
  )
}

export default HighLightText