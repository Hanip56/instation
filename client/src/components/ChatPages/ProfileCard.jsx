import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentConv } from "../../features/chatting/chattingSlice";

const ProfileCard = ({ dataConv, currentConv, onlineUsers }) => {
  const isOnline = onlineUsers.some(
    (user) => user.userId === dataConv.member._id
  );

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
        <div className="relative w-12 h-12 rounded-full">
          {isOnline && (
            <div className="w-3 h-3 bg-green-400 rounded-full absolute"></div>
          )}
          <img
            src={user.profilePicture}
            alt={user.username}
            className="object-cover object-center w-full h-full rounded-full"
          />
        </div>
        <div>
          <p>{user.username}</p>
          {isOnline && <p className="text-gray-400">Active</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
