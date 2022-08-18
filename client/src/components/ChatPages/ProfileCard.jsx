import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentConv } from "../../features/chatting/chattingSlice";

const ProfileCard = ({ dataConv, currentConv }) => {
  const dispatch = useDispatch();
  const user = dataConv?.member;
  const isActive = currentConv?.member?._id === user._id;

  const handleSetCurrentConv = () => {
    dispatch(setCurrentConv(dataConv));
  };

  return (
    <div className="w-full cursor-pointer" onClick={handleSetCurrentConv}>
      <div
        className={`flex gap-x-4 px-6 py-3 hover:bg-gray-300/20 ${
          isActive && "bg-gray-300/20"
        }`}
      >
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={user.profilePicture}
            alt={user.username}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div>
          <p>{user.username}</p>
          <p className="text-gray-400">Active</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
