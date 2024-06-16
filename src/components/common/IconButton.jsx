import React from "react";

const IconButton = ({
  text,
  onClick,
  children,
  disabled,
  // outline = false,
  customClasses,
  type,


}) => {
  return (
    <button
    disabled={disabled}
    onClick={onClick}
    type={type}
    className={customClasses}>
        {
            children 
            ? (<>
                    <span>
                        {text}
                    </span>
                    {children}
                </>)
            : (text)
        }
    </button>
  );
};

export default IconButton;
