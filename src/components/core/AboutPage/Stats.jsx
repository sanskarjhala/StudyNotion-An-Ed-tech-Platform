import React from 'react'

const statsComponenets = [
    {
        count:"5K",
        label:"Active Students"
    },
    {
        count:"10+",
        label:"Mentors"
    },
    {
        count:"200+",
        label:"Courses"
    },
    {
        count:"50+",
        label:"Awards"
    },
    
    
]

const Stats = () => {
  return (
    <section>
        <div>
            <div className='flex flex-col gap-y-10 md:flex-row md:gap-x-5 justify-evenly items-center'>
                {
                    statsComponenets.map( (data,index) => {
                        return (
                            <div key={index} className='flex flex-col gap-y-2 items-center justify-center'>
                                <h1 className='text-2xl md:text-4xl text-richblack-5 font-bold'>{data.count}</h1>
                                <h2 className="text-richblack-300 text-[16px]">{data.label}</h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>

  )
}

export default Stats