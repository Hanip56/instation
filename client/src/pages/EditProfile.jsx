import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ModalEditPhoto from "../components/EditProfile/ModalEditPhoto";
import Footer from "../components/Footer";
import LdsSpinner from "../components/UI/LdsSpinner";
import {
  getPersonalAccount,
  resetUser,
  updateUser,
} from "../features/auth/userSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const [showModalPhoto, setShowModalPhoto] = useState(false);
  const { user, isSuccess, isLoading, stateUpdateUser } = useSelector(
    (state) => state.user
  );
  const [form, setForm] = useState({
    fullname: user?.fullname,
    username: user?.username,
    porfileBio: user?.porfileBio,
    email: user?.email,
    gender: user?.gender,
  });

  useEffect(() => {
    dispatch(getPersonalAccount());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetUser());
    }
  }, [dispatch, isSuccess]);

  // choices
  useEffect(() => {
    setForm({
      fullname: user?.fullname,
      username: user?.username,
      porfileBio: user?.porfileBio,
      email: user?.email,
      gender: user?.gender,
    });
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(form));
  };

  const handleOpen = () => {
    setShowModalPhoto(true);
  };

  useEffect(() => {
    if (stateUpdateUser) {
      toast.success("Updated Successfully");
    }
  }, [stateUpdateUser]);

  return (
    <>
      {showModalPhoto && (
        <ModalEditPhoto hideModal={() => setShowModalPhoto(false)} />
      )}

      <div className="w-full">
        <main className="bg-white w-full flex border border-gray-500/50 rounded-sm py-2 px-4 md:py-4 md:px-6 ">
          <div className="basis-40 hidden md:block">
            <p>Edit Profile</p>
          </div>
          <div className="space-y-4 p-2 w-full">
            <div className="flex gap-x-6 items-center md:ml-24">
              <div className="w-8 h-8 overflow-hidden rounded-full">
                <img
                  src={user?.profilePicture}
                  alt={user?.username}
                  className="object-cover w-full h-full object-center"
                />
              </div>
              <div>
                <h4 className="font-semibold">{user?.username}</h4>
                <button
                  className="font-semibold text-sm text-blue-ig"
                  onClick={handleOpen}
                >
                  change profile picture
                </button>
              </div>
            </div>
            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
              <div className="formControl">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="fullname"
                  placeholder="Name"
                  value={form.fullname}
                  onChange={handleChange}
                />
              </div>
              <div className="formControl">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={form.username}
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="formControl">
                <label htmlFor="bio">Bio</label>
                <textarea
                  name="porfileBio"
                  id="bio"
                  cols="30"
                  rows="5"
                  placeholder="Bio"
                  value={form.porfileBio}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="formControl">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="formControl">
                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  placeholder="Gender"
                  value={form.gender}
                  onChange={handleChange}
                />
              </div>
              <button className="relative py-1 px-4 bg-blue-ig rounded-md w-28 text-sm mx-auto md:ml-[9.5rem] text-white text-center flex justify-center">
                {isLoading && <LdsSpinner width={"1rem"} height={"1rem"} />}
                {!isLoading && "Submit"}
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default EditProfile;
