import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addConversation,
  getConversation,
  setCurrentConv,
} from "../../features/chatting/chattingSlice";

const ModalFindChat = ({ setShowModal }) => {
  const { user } = useSelector((state) => state.user);
  const { conversations } = useSelector((state) => state.chatting);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversation());

    return () => {
      dispatch(getConversation());
    };
  }, [dispatch]);

  const handleAddConv = (id) => {
    setShowModal(false);

    const isAddedToChat = conversations
      .map((conv) => {
        const member = conv.members.filter((member) => member._id === id);

        return { id: conv._id, member };
      })
      .filter((conv) => conv.member.length > 0);

    if (isAddedToChat.length < 1) {
      dispatch(addConversation({ receiverId: id }));
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
    <>
      <div
        className="fixed z-[55] w-screen h-screen bg-black/60 left-0 top-0"
        onClick={() => setShowModal(false)}
      ></div>

      <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-[60] flex justify-center items-center rounded-md">
        <div className="w-[90vw] sm:w-[25rem] bg-white rounded-lg overflow-hidden flex flex-col divide-y-[1px] text-sm ">
          <header className="flex justify-between items-center py-2 px-4">
            <button onClick={() => setShowModal(false)}>X</button>
            <p className="text-gray-900 text-md font-semibold">New Message</p>
            <div />
          </header>
          <main className="flex h-96 flex-col">
            <h5 className="text-sm m-4 mb-1 font-semibold">Sugested</h5>
            <div>
              {user?.followings?.map((following, idx) => (
                <div key={following._id}>
                  <div
                    key={following._id}
                    className=" py-2 px-4 flex items-center gap-x-2 hover:bg-gray-400/10 cursor-pointer"
                    onClick={() => handleAddConv(following._id)}
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={following.profilePicture}
                        alt={following.username}
                        className="w-full h-full object-cover object-center "
                      />
                    </div>
                    <div>
                      <p className="text-base font-semibold">
                        {following.username}
                      </p>

                      <p className="text-gray-400 text-sm">
                        {following.fullname}
                      </p>
                    </div>
                    <div className="w-6 h-6 border border-black rounded-full ml-auto mr-2" />
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ModalFindChat;
