import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { VscSmiley } from "react-icons/vsc";
import { IoPaperPlaneOutline } from "react-icons/io5";
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
  setCurrentConv,
} from "../features/chatting/chattingSlice";
import ModalFindChat from "../components/Modal/ModalFindChat";

const ChatPages = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalFindChat, setModalFindChat] = useState(false);
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

    return () => {
      dispatch(setCurrentConv({}));
    };
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

    return () => {
      socket?.disconnect();
      socket?.close();
    };
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
    chatBoxRef?.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  return (
    <>
      {modalDelete && (
        <ModalDelete
          hideModal={() => setModalDelete(false)}
          convId={currentConv?.id}
        />
      )}

      {modalFindChat && <ModalFindChat setShowModal={setModalFindChat} />}

      <div className="w-full flex bg-white rounded-sm border border-gray-300 h-[87vh] overflow-x-scroll md:overflow-x-auto">
        <div className="basis-[20rem] border border-transparent border-r-gray-300">
          <header className="relative py-4 px-10 h-16 flex items-center justify-center border border-transparent border-b-gray-300">
            <h2 className="text-xl font-bold">{user?.username}</h2>
          </header>
          <main className="flex-1 flex flex-col">
            {arrayUnique?.map((dataConv, idx) => (
              <ProfileCard
                key={dataConv?.id}
                dataConv={dataConv}
                currentConv={currentConv}
                onlineUsers={onlineUsers}
              />
            ))}
          </main>
        </div>
        {Object.keys(currentConv).length > 0 ? (
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
                  <p className="text-xs text-gray-400"></p>
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
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center gap-y-2 min-w-[18rem] px-4">
            <div className="w-24 h-24 border-2 border-black rounded-full flex justify-center items-center">
              <IoPaperPlaneOutline size={42} />
            </div>
            <h4 className="text-2xl font-light">Your Messages</h4>
            <p className="text-sm text-gray-400 text-center">
              Send private photos and messages to a friend or group.
            </p>
            <button
              onClick={() => setModalFindChat(true)}
              className="py-1 px-3 text-white text-sm font-semibold mt-2 bg-blue-ig rounded-sm active:bg-blue-ig/70"
            >
              Send Message
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatPages;
