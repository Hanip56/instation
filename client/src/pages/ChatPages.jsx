import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { VscSmiley } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import MessageCard from "../components/ChatPages/MessageCard";
import ModalDelete from "../components/ChatPages/ModalDelete";
import ProfileCard from "../components/ChatPages/ProfileCard";
import io from "socket.io-client";
import {
  addMessageSync,
  getConversation,
  getMessages,
  resetConv,
  sendMessages,
} from "../features/chatting/chattingSlice";

const ChatPages = () => {
  const dispatch = useDispatch();
  // const [currentConv, setCurrentConv] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [modalDelete, setModalDelete] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState({});
  // const socket = useRef(io("ws://localhost:5000"));
  const { conversations, isSuccesConv, isLoadingMsg, messages, currentConv } =
    useSelector((state) => state.chatting);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const SOCKET_ENDPOINT =
      process.env.NODE_ENV === "production"
        ? "https://instation.herokuapp.com"
        : "ws://localhost:5000";
    setSocket(io(SOCKET_ENDPOINT));
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      dispatch(addMessageSync(arrivalMessage));
    }
  }, [arrivalMessage, dispatch]);

  useEffect(() => {
    socket?.emit("addUser", user?._id);
    socket?.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
    socket?.on("receiveMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [user, socket]);

  // useEffect(() => {
  //   socket?.on("getUsers", (users) => {
  //     console.log(users);
  //   });
  // }, [socket]);

  useEffect(() => {
    if (isSuccesConv) {
      dispatch(resetConv());
    }
  }, [dispatch, isSuccesConv]);

  useEffect(() => {
    dispatch(getConversation());
  }, [dispatch]);

  const friendConv = conversations
    .map((conv) => {
      const member = conv.members.filter((con) => con._id !== user._id);

      return { id: conv._id, member };
    })
    .map((conv) => ({ id: conv.id, member: conv.member[0] }));

  const arrayUnique = friendConv.filter(
    (value, index, self) =>
      self.map((x) => x.member._id).indexOf(value.member._id) == index
  );

  useEffect(() => {
    if (currentConv) {
      dispatch(getMessages(currentConv.id));
    }
  }, [currentConv, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      conversationId: currentConv.id,
      text: textMessage,
    };

    socket.emit("sendMessage", {
      senderId: user?._id,
      receiverId: currentConv?.member?._id,
      text: textMessage,
    });

    if (currentConv) {
      dispatch(sendMessages(data));
      setTextMessage("");
    }
  };

  useEffect(() => {
    chatBoxRef.current.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  return (
    <>
      {modalDelete && (
        <ModalDelete
          hideModal={() => setModalDelete(false)}
          convId={currentConv?.id}
        />
      )}

      <div className="w-full flex bg-white rounded-sm border border-gray-300 h-[87vh]">
        <div className="basis-[20rem] border border-transparent border-r-gray-300">
          <header className="relative py-4 px-10 h-16 flex items-center justify-center border border-transparent border-b-gray-300">
            <h2 className="text-xl font-bold">{user?.username}</h2>
          </header>
          <main className="flex-1 flex flex-col">
            {arrayUnique.map((dataConv, idx) => (
              <ProfileCard
                key={dataConv?.id}
                dataConv={dataConv}
                currentConv={currentConv}
                onlineUsers={onlineUsers}
              />
            ))}
          </main>
        </div>
        <div className="flex-1 flex flex-col">
          <header className="relative py-4 px-10 h-[4.05rem] flex items-center justify-between border border-transparent border-b-gray-300">
            <div className="text-left flex gap-x-2 items-center">
              <div className="w-6 h-6 rounded-full mr-2">
                <img
                  src={currentConv?.member?.profilePicture}
                  alt={currentConv?.member?.username}
                  className="object-cover object-center w-full h-full"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {currentConv?.member?.username}
                </h2>
                <p className="text-xs text-gray-400">Active 1h ago</p>
              </div>
            </div>
            <div
              className="cursor-pointer w-6 h-6 flex justify-center items-center rounded-full"
              onClick={() => setModalDelete(true)}
            >
              i
            </div>
          </header>
          {/* chat */}
          <main
            className="flex-1 p-6 space-y-3 w-full overflow-y-scroll"
            ref={chatBoxRef}
          >
            {/* {isLoadingMsg && <Spinner />} */}
            {messages.length > 0 &&
              messages?.map((message, idx) => (
                <MessageCard
                  key={`${message?._id}${idx}`}
                  message={message}
                  userConv={currentConv}
                />
              ))}
          </main>
          {/* send message */}
          <footer className="basis-16 p-4">
            <form
              className="flex border border-gray-300 p-3 rounded-full indent-4"
              onSubmit={handleSubmit}
            >
              <VscSmiley className="text-2xl mr-4" />
              <input
                type="text"
                placeholder="Message..."
                className="outline-none flex-1 text-sm"
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
              />
              <button
                type="submit"
                className="text-blue-300/80 font-semibold text-sm"
              >
                Send
              </button>
            </form>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ChatPages;
