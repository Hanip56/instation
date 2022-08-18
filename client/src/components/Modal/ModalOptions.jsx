import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  hideModalOptions,
  hideModalPostList,
  updatePost,
} from "../../features/postList/postListSlice";

const ModalOptions = () => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { showModalOptions } = useSelector((state) => state.postList);
  const currentPost = showModalOptions?.data;
  const [caption, setCaption] = useState(currentPost?.caption);

  const handleHideModal = () => {
    dispatch(hideModalOptions());
  };

  const handleDelete = () => {
    dispatch(deletePost(currentPost?._id));
    dispatch(hideModalOptions());
    dispatch(hideModalPostList());
  };

  const handleUpdate = () => {
    const data = {
      postId: currentPost?._id,
      data: {
        caption,
      },
    };

    dispatch(updatePost(data));
    dispatch(hideModalOptions());
    dispatch(hideModalPostList());
  };

  return (
    <>
      <div
        className="fixed z-[55] w-screen h-screen bg-black/60 left-0 top-0"
        onClick={handleHideModal}
      ></div>

      {!isEditing && (
        <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-[60] flex justify-center items-center rounded-md">
          <div className="w-[22rem] sm:w-[25rem] bg-white rounded-md overflow-hidden flex flex-col divide-y-[1px] text-sm ">
            {/* <p className="text-sm text-gray-500 text-center py-4">
            delete this Post?
          </p> */}
            <button
              className="w-full py-3 active:bg-gray-300/30 "
              onClick={handleDelete}
            >
              <p className="text-red-500 font-semibold">Delete</p>
            </button>
            <button
              className="w-full py-3 active:bg-gray-300/30"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="w-full py-3 active:bg-gray-300/30"
              onClick={handleHideModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-[60] flex justify-center items-center rounded-md">
          <div className="w-[90vw] sm:w-[40rem] bg-white rounded-lg overflow-hidden flex flex-col divide-y-[1px] text-sm ">
            <header className="flex justify-between items-center py-2 px-4">
              <button onClick={handleHideModal}>Cancel</button>
              <p className="text-gray-900 text-md font-semibold">Edit Info</p>
              <button
                className="text-blue-ig font-semibold"
                onClick={handleUpdate}
              >
                Done
              </button>
            </header>
            <main className="flex h-96">
              <div className="basis-[60%] bg-black">
                <div className="w-full h-full">
                  <img
                    src={currentPost?.image}
                    alt={currentPost?.caption}
                    className="w-full h-full object-contain object-center"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-3 p-4">
                <div className="flex gap-x-3 items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={currentPost?.postedBy?.profilePicture}
                      alt={currentPost?.postedBy?.username}
                    />
                  </div>
                  <h4 className="font-semibold">
                    {currentPost?.postedBy?.username}
                  </h4>
                </div>
                <textarea
                  name="caption"
                  id=""
                  className="outline-none w-full h-[85%]"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                ></textarea>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalOptions;
