import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full text-gray-500/50 flex flex-col text-center p-4">
      <div className="w-full text-xs leading-6 flex justify-center items-center gap-x-6 p-2 flex-wrap">
        <Link to="#">About</Link>
        <Link to="#">Help</Link>
        <Link to="#">Press</Link>
        <Link to="#">API</Link>
        <Link to="#">Jobs</Link>
        <Link to="#">Privacy</Link>
        <Link to="#">Terms</Link>
        <Link to="#">Locations</Link>
        <Link to="#">Language</Link>
      </div>
      <h4 className="text-sm mt-3">&copy; 2022 INSTATION BY HANIP .A</h4>
    </div>
  );
};

export default Footer;
