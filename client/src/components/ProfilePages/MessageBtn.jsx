import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addConversation,
  getConversation,
  setCurrentConv,
} from "../../features/chatting/chattingSlice";

const MessageBtn = ({ following }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversation());
  }, [dispatch]);

  const { conversations } = useSelector((state) => state.chatting);

  const isAddedToChat = conversations
    .map((conv) => {
      const member = conv.members.filter(
        (member) => member._id === following._id
      );

      return { id: conv._id, member };
    })
    .filter((conv) => conv.member.length > 0);
  // .map((conv) => ({ id: conv.id, member: conv.member[0] }));

  console.log(isAddedToChat);

  const handleAddConv = () => {
    if (isAddedToChat.length < 1) {
      dispatch(addConversation({ receiverId: following?._id }));
      return;
    }
    dispatch(
      setCurrentConv({
        id: isAddedToChat[0].id,
        member: isAddedToChat[0].member[0],
      })
    );
  };

  return (
    <button className="actionBtn" onClick={handleAddConv}>
      Messages
    </button>
  );
};

export default MessageBtn;
