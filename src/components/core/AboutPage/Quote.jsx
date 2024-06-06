import React from "react";
import HighLightText from "../HomePage/HighLightText";

const Quote = () => {
  return (
    <div className="text-2xl md:text-4xl max-w-[85%] text-center font-bold">
      We are passionate about revolutionizing the way we learn. Our innovative
      platform <HighLightText text={"combines technology"}/>, 
      <span className="text-pink-200">
        {" "}
        expertise
      </span>
      , and community to create an
      <span className="text-pink-200">
      {" "}
      unparalleled educational experience.
      </span>
    </div>
  );
};

export default Quote;
