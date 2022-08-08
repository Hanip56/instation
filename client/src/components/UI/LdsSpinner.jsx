import React from "react";
import "./ldsSpinner.css";

const LdsSpinner = ({ width, height }) => {
  return (
    <div className=" w-full h-6 pl-12 flex justify-center items-center relative">
      <div className="lds-spinner mx-auto absolute">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LdsSpinner;
