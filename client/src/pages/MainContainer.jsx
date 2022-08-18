import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import ModalCreate from "../components/Modal/ModalCreate";
import Navbar from "../components/Navbar";
import Home from "./Home";
import ProfilePages from "./ProfilePages";
import { useEffect } from "react";
import { getPersonalAccount, resetUser } from "../features/auth/userSlice";
import ModalPost from "../components/Modal/ModalPost";
import Explore from "./Explore";
import { useDisableBodyScroll } from "../hooks/preventWindowScroll";
import EditProfile from "./EditProfile";
import ModalThreeDots from "../components/Modal/ModalThreeDots";
import { toast } from "react-toastify";
import ChatPages from "./ChatPages";
import ModalOptions from "../components/Modal/ModalOptions";

const MainContainer = () => {
  const { showModal } = useSelector((state) => state.createPost);
  const {
    showModalPostList,
    showModalThreeDots,
    showModalOptions,
    updatedIsSuccess,
    deletedIsSuccess,
  } = useSelector((state) => state.postList);
  const { stateCreatePost, isError, message } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersonalAccount());
  }, [dispatch]);

  useDisableBodyScroll(showModal);
  useDisableBodyScroll(showModalPostList.set);
  useDisableBodyScroll(showModalThreeDots.set);

  useEffect(() => {
    dispatch(resetUser());
  }, [isError, dispatch]);

  useEffect(() => {
    if (stateCreatePost) {
      toast.success("posted succesfully");
    }
  }, [stateCreatePost]);

  useEffect(() => {
    if (updatedIsSuccess) {
      toast.success("updated succesfully");
    }
  }, [updatedIsSuccess]);

  useEffect(() => {
    if (deletedIsSuccess) {
      toast.success("deleted succesfully");
    }
  }, [deletedIsSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  return (
    <div className=" min-h-screen">
      {showModalPostList.set && <ModalPost />}
      {showModalThreeDots.set && <ModalThreeDots />}
      {showModalOptions.set && <ModalOptions />}
      {showModal && <ModalCreate />}

      <Navbar />
      <main className="pt-20 p-2 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/:username" element={<ProfilePages />} />
          <Route path="/chat" element={<ChatPages />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/signin" element={<Navigate to="/" replace />} />
          <Route path="/signup" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default MainContainer;
