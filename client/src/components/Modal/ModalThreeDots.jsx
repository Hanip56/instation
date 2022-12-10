import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unfollowUser } from "../../features/auth/userSlice";
import { hideModalThreeDots } from "../../features/postList/postListSlice";

const ModalThreeDots = () => {
  const dispatch = useDispatch();
  const { showModalThreeDots } = useSelector((state) => state.postList);

  const handleHideModal = () => {
    dispatch(hideModalThreeDots());
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(showModalThreeDots?.data?.postedBy?._id));
    dispatch(hideModalThreeDots());
  };

  return (
    <>
      <div
        className="fixed z-[45] w-screen h-screen bg-black/60 left-0 top-0"
        onClick={handleHideModal}
      ></div>

      <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-50 flex justify-center items-center rounded-md">
        <div className="w-[18rem] sm:w-[25rem] bg-white rounded-md overflow-hidden flex flex-col divide-y-[1px] text-sm ">
          {/* <button className="w-full py-3 active:bg-gray-300/30 ">Open</button> */}
          <button
            className="w-full py-3 active:bg-gray-300/30 text-red-500 font-semibold"
            onClick={handleUnfollow}
          >
            Unfollow
          </button>
          <button
            className="w-full py-3 active:bg-gray-300/30"
            onClick={handleHideModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalThreeDots;
