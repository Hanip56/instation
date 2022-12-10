import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/auth/userSlice";
import { hideModalCP, resetCP } from "../../features/post/postSlice";
import Spinner from "../UI/Spinner";

const ModalCreate = () => {
  const [caption, setCaption] = useState("");
  const [postImage, setPostImage] = useState();
  const { user, isLoading, isSuccess, isError } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSuccess) {
      dispatch(hideModalCP());
    }
  }, [isSuccess, dispatch]);

  const handleClose = () => {
    dispatch(hideModalCP());
    dispatch(resetCP());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("postimage", postImage);
    formdata.append("caption", caption);

    dispatch(createPost(formdata));
  };

  return (
    <>
      <div className="fixed z-[45] w-screen h-screen bg-black/60"></div>

      <div className="fixed z-50 w-screen h-screen flex justify-center items-center rounded-md">
        {isLoading && <Spinner />}
        {!isLoading && (
          <form
            onSubmit={handleSubmit}
            className="w-[80%] lg:w-[50rem] bg-white rounded-md overflow-hidden"
            encType="multipart/form-data"
          >
            <div className="flex justify-between items-center px-6 py-3 border border-b-gray-300">
              <button onClick={handleClose} type="button">
                x
              </button>
              <h2>Create new post</h2>
              <button type="submit" className="text-blue-ig font-semibold">
                share
              </button>
            </div>
            <div className="flex flex-col md:flex-row h-[30rem]">
              <div className="basis-[65%] w-full h-full bg-[#fafafa] flex justify-center items-center">
                {/* input file */}
                {postImage ? (
                  <img
                    src={URL.createObjectURL(postImage)}
                    alt=""
                    className="w-full h-full object-contain object-center"
                  ></img>
                ) : (
                  <>
                    <button
                      className="bg-blue-ig text-white font-semibold p-2 px-4 rounded-md hover:bg-blue-ig/60"
                      onClick={() => inputRef?.current?.click()}
                      type="button"
                    >
                      Select File
                    </button>
                    <input
                      type="file"
                      name="postimage"
                      id="file"
                      ref={inputRef}
                      className="hidden"
                      onChange={(e) => setPostImage(e.target.files[0])}
                    />
                  </>
                )}
              </div>
              <div className="space-y-2 flex-1 w-full h-full border border-l-gray-300 p-3">
                <div className="flex gap-x-2 items-center">
                  <div className="w-10 h-10 overflow-hidden rounded-full">
                    <img
                      src={user?.profilePicture}
                      alt={user?.username}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{user?.username}</h4>
                    {/* <p className="text-sm text-gray-400">{user?.fullname}</p> */}
                  </div>
                </div>
                <div>
                  <textarea
                    className="outline-none"
                    name="caption"
                    onChange={(e) => setCaption(e.target.value)}
                    value={caption}
                    placeholder="Write caption"
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default ModalCreate;
