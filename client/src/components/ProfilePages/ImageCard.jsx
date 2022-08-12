import React from "react";
import { IoHeartSharp, IoChatbubbleSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { showModalPostList } from "../../features/postList/postListSlice";

const ImageCard = ({ post }) => {
  const dispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(showModalPostList(post));
  };

  return (
    <>
      <div className="group cursor-pointer relative" onClick={handleShowModal}>
        <div className="w-full h-full absolute  text-white text-2xl ">
          <div className="hidden group-hover:flex justify-center items-center w-full h-full gap-x-7 bg-black/40">
            <div className="flex gap-x-2 items-center">
              <IoHeartSharp />{" "}
              <span className="text-lg font-semibold">
                {post?.likes?.length}
              </span>
            </div>
            <IoChatbubbleSharp />{" "}
            <span className="text-lg font-semibold">
              {post?.comments?.length}
            </span>
          </div>
        </div>
        <img src={post?.image} alt="" className="object-cover w-full h-full" />
      </div>
    </>
  );
};

export default ImageCard;
