import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighLightText from "../components/core/HomePage/HighLightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import Gradient1 from "../assets/Images/Ellipse 2.svg";
import Gradient2 from "../assets/Images/Gradient 2.svg";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer"

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto w-11/12 flex flex-col items-center text-white justify-between">

        <Link to={"/signup"}>
          <div
            className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
          transition duration-200 hover:scale-95 w-fit"
          >
            <div className="flex items-center rounded-full px-10 py-[5px] gap-2 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold m-10 ">
          Empower Your Future With <HighLightText text={"Coding Skills"} />
        </div>

        <div className="w-[65%] text-center text-lg font-thin text-richblack-300 text-[16px]">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8 ">
          <CTAButton active={true} linkedTo={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkedTo={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        {/*Video */}
        <div
          className="shadow-[-14px_-29px_38px_11px_#90cdf4,20px_22px_0px_2px_#f7fafc] mx-3  my-20
         "
        >
          <video muted loop autoPlay>
            <source src={Banner} />
          </video>
        </div>

        {/* Code Section 1 */}
        <div className="relative">
          <CodeBlocks
            backgroudGradient={Gradient1}
            position={"flex-col lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your <HighLightText text={"coding potential"} /> with our
                online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>\n<html>\n<head>\n<title>Example\n</title>\n<linkrel="stylesheet\n"href="styles.css">\n/head>\n`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            backgroudGradient={Gradient2}
            position={"flex-col lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start <HighLightText text={`Coding in seconds `} />
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>\n<html>\n<head>\n<title>Example\n</title>\n<linkrel="stylesheet\n"href="styles.css">\n/head>\n`}
            codeColor={"text-yellow-25"}
          />
        </div>

        <ExploreMore/>

      </div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700 ">
        <div className="homepage_bg h-[120px] lg:h-[333px] ">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto">
            <div className="h-[50px]  lg:h-[150px]"></div>
            <div className="flex flex-row text-white gap-7 h-[100%] items-center ">
              <CTAButton active={true} linkedTo={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkedTo={"/signup"}>
                <div className="flex items-center gap-2">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div
          className=" mx-auto w-11/12  max-w-maxContent flex flex-col items-center justify-between
        gap-10"
        >
          <div className="flex flex-col lg:flex-row gap-5 mb-10 mt-24">
            <div className="text-4xl font-semibold lg:w-[45%]">
              Get the Skills you need for a
              <HighLightText text={"Job That is in Demand"} />
            </div>

            <div className=" flex flex-col lg:w-[40%] gap-10 items-start">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkedTo={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>
          

          {/* HW: Dotted Lines Left to Add */}
          <TimeLineSection />

          
          <LearningLanguageSection /> 
        </div>
      </div>

      {/* Section 3 */}
      <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-10 lg:gap-20
      bg-richblack-900 text-white mx-auto">

        <InstructorSection/>

        <h2 className="text-center text-4xl font-bold mt-10">Review From other Learners </h2>

      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Home;