import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full text-gray-500/50 flex flex-col text-center p-4">
      <div className="w-full text-xs leading-6 flex justify-center items-center gap-x-6 p-2 flex-wrap">
        <Link to="/about">About</Link>
        <Link to="/about">Help</Link>
        <Link to="/about">Press</Link>
        <Link to="/about">API</Link>
        <Link to="/about">Jobs</Link>
        <Link to="/about">Privacy</Link>
        <Link to="/about">Terms</Link>
        <Link to="/about">Locations</Link>
        <Link to="/about">Language</Link>
      </div>
      <h4 className="text-sm mt-3">&copy; 2022 INSTATION BY HANIP .A</h4>
    </div>
  );
};

export default Footer;
