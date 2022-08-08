import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../../features/auth/userSlice";

const FollowerCard = ({ follower }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const isFollowed = user?.followings?.some(
    (e) => e._id?.toString() === follower._id?.toString()
  );

  const isOwnUser = follower?._id?.toString() === user?._id?.toString();

  const handleFollow = () => {
    dispatch(followUser(follower?._id));
  };

  return (
    <>
      <div key={follower._id} className="px-4 py-2 flex items-center gap-x-2">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={follower.profilePicture}
            alt={follower.username}
            className="w-full h-full object-cover object-center "
          />
        </div>
        <div>
          <p className="text-md font-semibold">
            {follower.username}
            {!isFollowed && !isOwnUser && (
              <span
                className="text-xs text-blue-ig cursor-pointer"
                onClick={handleFollow}
              >
                {" "}
                . Follow
              </span>
            )}
          </p>

          <p className="text-gray-400 text-sm">{follower.fullname}</p>
        </div>

        <button className="ml-auto px-3 py-1 border border-gray-300 font-semibold text-sm">
          Remove
        </button>
      </div>
    </>
  );
};

export default FollowerCard;
