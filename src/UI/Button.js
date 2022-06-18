import React from "react";

const Button = ({ onClick, className, children }) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
