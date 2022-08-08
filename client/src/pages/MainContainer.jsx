import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import ModalCreate from "../components/UI/ModalCreate";
import Navbar from "../components/Navbar";
import Home from "./Home";
import ProfilePages from "./ProfilePages";
import { useEffect } from "react";
import { getPersonalAccount } from "../features/auth/userSlice";
import ModalPost from "../components/UI/ModalPost";

const MainContainer = () => {
  const { showModal } = useSelector((state) => state.createPost);
  const { showModalPost } = useSelector((state) => state.postsFollowing);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersonalAccount());
  }, [dispatch]);

  return (
    <div className="bg-[#fafafa] min-h-screen">
      {showModalPost.set && <ModalPost />}
      {showModal && <ModalCreate />}
      <Navbar />
      <main className="pt-20 p-2 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/:username" element={<ProfilePages />} />
          <Route path="/signin" element={<Navigate to="/" replace />} />
          <Route path="/signup" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default MainContainer;
