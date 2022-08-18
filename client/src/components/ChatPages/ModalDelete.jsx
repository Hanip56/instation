import React from "react";
import { useDispatch } from "react-redux";
import { deleteConversation } from "../../features/chatting/chattingSlice";

const ModalDelete = ({ hideModal, convId }) => {
  const dispatch = useDispatch();

  const handleHideModal = () => {
    hideModal();
  };

  const handleDelete = () => {
    dispatch(deleteConversation(convId));
    hideModal();
  };

  return (
    <>
      <div
        className="fixed z-[45] w-screen h-screen bg-black/60 left-0 top-0"
        onClick={handleHideModal}
      ></div>

      <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-50 flex justify-center items-center rounded-md">
        <div className="w-[22rem] sm:w-[25rem] bg-white rounded-md overflow-hidden flex flex-col divide-y-[1px] text-sm ">
          {/* <button className="w-full py-3 active:bg-gray-300/30 ">Open</button> */}
          <p className="text-sm text-gray-500 text-center py-4">
            delete this conversation?
          </p>
          <button
            className="w-full py-3 active:bg-gray-300/30 "
            onClick={handleDelete}
          >
            <p className="text-red-500 font-semibold">Delete</p>
          </button>
          <button
            className="w-full py-3 active:bg-gray-300/30"
            onClick={handleHideModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalDelete;
