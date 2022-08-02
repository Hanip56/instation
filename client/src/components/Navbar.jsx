import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed z-40 bg-white w-screen h-14 border border-b-gray">
      <div className="flex px-3 justify-between items-center max-w-5xl h-full mx-auto gap-x-2">
        <div>INSTAGRAM</div>
        <div className="flex gap-x-2 items-center">
          <div className=" bg-gray-200 w-60 h-8 rounded-md p-2 hidden sm:flex ">
            <label htmlFor="search"></label>
            <input
              type="text"
              id="search"
              placeholder="Search..."
              className="bg-transparent"
            />
          </div>
          <div>
            <ul className="flex gap-x-2">
              <li>Home</li>
              <li>Send</li>
              <li>Plus</li>
              <li>Compas</li>
              <li>Love</li>
              <li>Profile</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
