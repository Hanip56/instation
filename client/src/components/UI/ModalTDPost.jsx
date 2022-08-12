import React from "react";

const ModalTDPost = () => {
  return (
    <>
      <div className="fixed z-[45] w-screen h-screen bg-black/60 left-0 top-0"></div>

      <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-50 flex justify-center items-center rounded-md">
        <div className="w-[22rem] sm:w-[25rem] bg-white h-60 rounded-md overflow-hidden"></div>
      </div>
    </>
  );
};

export default ModalTDPost;
