import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../features/auth/userSlice";

const ToggleFollowUnfollow = ({ following, containerStyle }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const isFollowed = user?.followings?.some(
    (f) => f?._id?.toString() === following?._id?.toString()
  );

  const handleUnfollow = () => {
    dispatch(unfollowUser(following?._id));
  };
  const handleFollow = () => {
    dispatch(followUser(following?._id));
  };

  return (
    <button
      onClick={isFollowed ? handleUnfollow : handleFollow}
      className={`px-3 py-1 border border-gray-300 font-semibold text-sm outline-none ${
        !isFollowed && "bg-blue-ig text-white"
      } ${containerStyle}`}
    >
      {isFollowed ? "Following" : "Follow"}
    </button>
  );
};

export default ToggleFollowUnfollow;
