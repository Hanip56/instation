import React from "react";
import { useSelector } from "react-redux";

const MessageCard = ({ message, userConv }) => {
  const { user } = useSelector((state) => state.user);

  const isOwn = message.sender === user._id;

  return (
    <div className="w-full flex items-center">
      {!isOwn && (
        <div className="w-6 h-6 rounded-full mr-2">
          <img
            src={userConv?.member?.profilePicture}
            alt={userConv?.member?.username}
            className="object-cover object-center w-full h-full"
          />
        </div>
      )}
      <div
        className={`rounded-full inline-block py-3 px-4 border border-transparent ${
          isOwn ? "bg-gray-200/50 ml-auto" : "border-gray-200/80"
        }`}
      >
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
};

export default MessageCard;
