import React from "react";
import { Link } from "react-router-dom";
import ToggleFollowUnfollow from "../UI/ToggleFollowUnfollow";

const FollowingCard = ({ following }) => {
  return (
    <>
      <div key={following._id} className="px-4 py-2 flex items-center gap-x-2">
        <Link to={`/${following?.username}`}>
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={following.profilePicture}
              alt={following.username}
              className="w-full h-full object-cover object-center "
            />
          </div>
        </Link>
        <Link to={`/${following?.username}`}>
          <div>
            <p className="text-md font-semibold">{following.username}</p>

            <p className="text-gray-400 text-sm">{following.fullname}</p>
          </div>
        </Link>

        <ToggleFollowUnfollow following={following} containerStyle="ml-auto" />
      </div>
    </>
  );
};

export default FollowingCard;
