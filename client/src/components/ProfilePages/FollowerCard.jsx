import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { followUser, removeFollower } from "../../features/auth/userSlice";

const FollowerCard = ({ follower, setShowModal }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { username } = params;

  const isFollowed = user?.followings?.some(
    (e) => e._id?.toString() === follower._id?.toString()
  );
  const isFollower = user?.followers?.some(
    (e) => e._id?.toString() === follower._id?.toString()
  );

  const isOwnUser = follower?._id?.toString() === user?._id?.toString();

  const handleFollow = () => {
    dispatch(followUser(follower?._id));
  };

  const handleRemoveFollower = () => {
    dispatch(removeFollower(follower?._id));
    setShowModal("");
  };

  const isOwnProfile = username === user?.username;

  return (
    <>
      <div key={follower._id} className="px-4 py-2 flex items-center gap-x-2">
        <Link to={`/${follower?.username}`}>
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={follower.profilePicture}
              alt={follower.username}
              className="w-full h-full object-cover object-center "
            />
          </div>
        </Link>

        <Link to={`/${follower?.username}`}>
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
        </Link>

        {isFollower && isOwnProfile && (
          <button
            className="ml-auto px-3 py-1 border border-gray-300 font-semibold text-sm"
            onClick={handleRemoveFollower}
          >
            Remove
          </button>
        )}
      </div>
    </>
  );
};

export default FollowerCard;
