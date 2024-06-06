import React from "react";
import HighLightText from "../components/core/HomePage/HighLightText";
import Banner1 from "../assets/Images/aboutus1.webp";
import Banner2 from "../assets/Images/aboutus2.webp";
import Banner3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png";
import Stats from "../components/core/AboutPage/Stats";
import LearningSection from "../components/core/AboutPage/LearningSection";
import ContactForm from "../components/core/AboutPage/ContactForm";
import Footer from "../components/common/Footer";

const About = () => {
  return (
    <div>
      <div className="mx-auto text-white">
        {/* Section 1 */}
        <section className="bg-richblack-800 w-full pb-10">
          <div className="w-11/12 max-w-maxContent mx-auto pt-10 lg:pt-36">
            <div className="flex flex-col relative items-center">
              <header className=" text-2xl md:text-4xl font-bold md:max-w-[70%] mx-auto text-center ">
                Driving Innovation in Online Education for a
                <HighLightText text={"Brighter Future"} />
                <p className="text-sm font-thin my-8 max-w-[70%] mx-auto">
                  Studynotion is at the forefront of driving innovation in
                  online education. We're passionate about creating a brighter
                  future by offering cutting-edge courses, leveraging emerging
                  technologies, and nurturing a vibrant learning community.
                </p>
              </header>
              <div className="lg:mt-[250px]"></div>
              <div className="lg:absolute flex md:flex-row flex-col gap-y-4 mx-auto  lg:gap-x-3 lg:-right-1 lg:top-64 ">
                <img
                  src={Banner1}
                  alt=""
                  className="lg:max-w-[30%] max-h-[20%]"
                />
                <img
                  src={Banner2}
                  alt=""
                  className="lg:max-w-[30%] max-h-[20%]"
                />
                <img
                  src={Banner3}
                  alt=""
                  className="lg:max-w-[30%] max-h-[20%]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="py-16 md:py-32 border-b-[1px] border-richblack-700">
          <div className="w-11/12 max-w-maxContent mx-auto flex justify-center">
            <Quote />
          </div>
        </section>

        {/* Section 3 */}
        <section className="w-11/12 max-w-maxContent mx-auto my-24 md:my-32 ">
          <div className="flex flex-col ">
            {/* Founding Story box */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-[80px] md:mb-36">
              {/* Founding Story left Box */}
              <div className="md:w-[40%] flex flex-col gap-y-6">
                <h1 className="text-2xl text-center md:text-4xl font-bold text-caribbeangreen-200">
                  Our Founding Story
                </h1>
                <p className="text-[16px] text-richblack-300 text-center">
                  Our e-learning platform was born out of a shared vision and
                  passion for transforming education. It all began with a group
                  of educators, technologists, and lifelong learners who
                  recognized the need for accessible, flexible, and high-quality
                  learning opportunities in a rapidly evolving digital world.
                </p>
                <p className="text-[16px] text-richblack-300 text-center">
                  As experienced educators ourselves, we witnessed firsthand the
                  limitations and challenges of traditional education systems.
                  We believed that education should not be confined to the walls
                  of a classroom or restricted by geographical boundaries. We
                  envisioned a platform that could bridge these gaps and empower
                  individuals from all walks of life to unlock their full
                  potential.
                </p>
              </div>

              {/* Founding Story right Box */}
              <div className="max-w-[534px] my-5">
                <img src={FoundingStory} alt="" className="" />
              </div>
            </div>

            {/* Vision and Mission Box */}
            <div className="flex md:flex-row flex-col gap-y-10 justify-between items-center ">
              {/* left box */}
              <div className="md:w-[40%] flex flex-col gap-y-6">
                <h1 className="text-2xl text-center md:text-4xl font-bold text-caribbeangreen-200">
                  Our Vision
                </h1>
                <p className="text-[16px] text-richblack-300 text-center">
                  With this vision in mind, we set out on a journey to create an
                  e-learning platform that would revolutionize the way people
                  learn. Our team of dedicated experts worked tirelessly to
                  develop a robust and intuitive platform that combines
                  cutting-edge technology with engaging content, fostering a
                  dynamic and interactive learning experience.
                </p>
              </div>

              {/* Right Box */}
              <div className="md:w-[40%] flex flex-col gap-y-6">
                <h1 className="text-2xl md:text-4xl text-center font-bold text-caribbeangreen-200">
                  Our Mission
                </h1>

                <p className="text-[16px] text-richblack-300 text-center">
                  our mission goes beyond just delivering courses online. We
                  wanted to create a vibrant community of learners, where
                  individuals can connect, collaborate, and learn from one
                  another. We believe that knowledge thrives in an environment
                  of sharing and dialogue, and we foster this spirit of
                  collaboration through forums, live sessions, and networking
                  opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="bg-richblack-800 w-full py-24">
          <div  className="w-11/12 max-w-maxContent mx-auto">
            <Stats />
          </div>
        </section>

        {/* Section 5 */}
        <section className="flex flex-col items-center justify-center mt-10 mb-10 w-11/12 max-w-maxContent mx-auto">
          <LearningSection />
          <ContactForm />
        </section>

        {/* Review Slider */}
        <></>
      </div>

      <Footer />
    </div>
  );
};

export default About;
