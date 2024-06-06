import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactForm = () => {
  return (
    <div className='"mx-auto flex flex-col items-center  lg:mt-[200px]'>
        <h1 className='text-4xl mb-3'>Get in Touch</h1>
        <p className="text-richblack-300 mb-14 text-center">
        {`We'd love to here for you, Please fill out this form.`}
        </p>
        <div className='mx-auto'>
            <ContactUsForm/>
        </div>

    </div>  
  )
}

export default ContactForm