import React, { useEffect, useRef } from "react";
import { HiHome } from "react-icons/hi";
import {
  IoPaperPlaneOutline,
  IoCompassOutline,
  IoCompassSharp,
  IoHeartOutline,
  IoHeartSharp,
  IoBookmarkOutline,
  IoSettingsOutline,
  IoHomeOutline,
  IoHomeSharp,
  IoPaperPlaneSharp,
} from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { showModalCP } from "../features/post/postSlice";
import { useState } from "react";
import useOutsideAlerter from "../utils/ClickOutside";
import { logout } from "../features/auth/authSlice";
import axios from "axios";

const Navbar = () => {
  const [showBoxList, setShowBoxList] = useState(false);
  const boxListRef = useRef(null);
  const boxSearchRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const [searchedUser, setSearchedUser] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [showSearchedUser, setShowSearchedUser] = useState(false);
  const dispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(showModalCP());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const normalizeSearch = inputSearch.replace(/[^a-z0-9-_]/gi, "");

    const search = async () => {
      const res = await axios.get(`/api/user/s/find?search=${normalizeSearch}`);

      if (res?.data) {
        setSearchedUser(res.data);
      }
    };
    if (normalizeSearch) {
      search();
    }
  }, [inputSearch]);
  useOutsideAlerter(boxListRef, setShowBoxList);
  useOutsideAlerter(boxSearchRef, setShowSearchedUser);

  return (
    <nav className="fixed z-40 bg-white w-screen h-14 border border-b-gray">
      <div className="flex px-3 justify-between items-center max-w-5xl h-full mx-auto gap-x-2">
        <div>INSTATION</div>
        <div className="flex gap-x-2 items-center">
          <div className="relative bg-gray-100 w-60 h-8 rounded-md p-2 hidden sm:flex">
            <label htmlFor="search"></label>
            <input
              type="text"
              id="search"
              placeholder="Search..."
              className="bg-transparent outline-none w-full"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              onClick={() => setShowSearchedUser(true)}
              autoComplete="false"
            />
            {inputSearch && showSearchedUser && searchedUser && (
              <div
                className="absolute w-64 h-72 bg-white shadow-md rounded-sm top-10 left-0 overflow-y-scroll"
                ref={boxSearchRef}
              >
                {searchedUser?.map((user) => (
                  <Link to={`/${user.username}`}>
                    <div
                      className="px-4 w-full h-16 flex items-center gap-x-4 cursor-pointer hover:bg-gray-100"
                      key={user._id}
                      onClick={() => setShowSearchedUser(false)}
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={user?.profilePicture}
                          alt={user?.username}
                          className="object-cover object-center w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{user?.username}</p>
                        <p className="font-extralight text-sm">
                          {user?.fullname}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div>
            <ul className="ml-4 flex gap-x-4 text-2xl items-center">
              <li>
                <NavLink to="/">
                  {({ isActive }) =>
                    isActive ? <IoHomeSharp /> : <IoHomeOutline />
                  }
                </NavLink>
              </li>
              <li>
                <NavLink to="/chat">
                  {({ isActive }) =>
                    isActive ? <IoPaperPlaneSharp /> : <IoPaperPlaneOutline />
                  }
                </NavLink>
              </li>
              <li>
                <button onClick={handleShowModal}>
                  <IoIosAddCircleOutline />
                </button>
              </li>
              <li>
                <NavLink to="/explore">
                  {({ isActive }) =>
                    isActive ? <IoCompassSharp /> : <IoCompassOutline />
                  }
                </NavLink>
              </li>
              <li>
                <NavLink to="">
                  <IoHeartOutline />
                </NavLink>
              </li>
              <li
                className={`relative cursor-pointer border  ${
                  showBoxList
                    ? "border-black rounded-full"
                    : "border-transparent"
                }`}
                onClick={() => setShowBoxList((state) => !state)}
              >
                <div className="w-8 h-8 overflow-hidden rounded-full">
                  <img
                    src={user?.profilePicture}
                    alt={user?.username}
                    className="object-cover w-full h-full object-center"
                  />
                </div>
                {showBoxList && (
                  <div
                    ref={boxListRef}
                    className="absolute text-sm -right-2 w-44 rounded-md bg-white shadow-black/40 shadow-md"
                  >
                    <ul>
                      <NavLink to={`/${user?.username}`}>
                        <li className="boxList">
                          <CgProfile />
                          <p>Profile</p>
                        </li>
                      </NavLink>
                      <li className="boxList">
                        <IoBookmarkOutline />
                        <p>Saved</p>
                      </li>
                      <li className="boxList">
                        <IoSettingsOutline />
                        <p>Settings</p>
                      </li>
                      <li
                        onClick={handleLogout}
                        className="p-3 w-full hover:bg-[#fafafa] border border-t-gray-200"
                      >
                        <p>Log Out</p>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
