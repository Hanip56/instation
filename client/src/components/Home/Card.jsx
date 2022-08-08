import React from "react";
import { useState } from "react";
import {
  IoHeartOutline,
  IoHeartSharp,
  IoChatbubbleOutline,
  IoPaperPlaneOutline,
  IoBookmarkOutline,
  IoBookmarkSharp,
} from "react-icons/io5";
import { VscSmiley } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  likePostFollowing,
  savePostFollowing,
  showModalPost,
} from "../../features/post/postSlice";

const Card = ({ post }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const { username } = params;

  const liked = post?.likes?.some((e) => e?._id === user?._id);

  const saved = post?.savedBy?.some((e) => e?._id === user?._id);

  const handleLoves = () => {
    dispatch(likePostFollowing(post._id));
  };
  const handleSave = () => {
    dispatch(savePostFollowing(post._id));
  };

  const handleShowModal = () => {
    dispatch(showModalPost(post));
  };

  return (
    <div className="max-w-lg mx-auto rounded-md border border-gray-300">
      <header className="w-full h-14 flex justify-between items-center px-2">
        <Link to={`/${post?.postedBy?.username}`}>
          <div className="flex items-center gap-x-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={post?.postedBy?.profilePicture}
                alt={post?.postedBy?.username}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col justify-between">
              <h4 className="font-medium ">{post?.postedBy?.username}</h4>
              <p className="font-light text-sm">mondstadt</p>
            </div>
          </div>
        </Link>
        <div className="flex justify-center items-center">...</div>
      </header>
      <main>
        <div className="w-full max-h-[30rem] overflow-hidden">
          <img
            src={post?.image}
            alt="post img"
            className="object-contain w-full h-full object-center"
          />
        </div>
        <div className="flex items-center justify-between p-2 px-3 text-2xl">
          <div className="flex items-center gap-x-4">
            <button onClick={handleLoves}>
              {liked && <IoHeartSharp className="text-red-500" />}
              {!liked && <IoHeartOutline className="hover:text-black/40" />}
            </button>
            <button className="hover:text-black/40" onClick={handleShowModal}>
              <IoChatbubbleOutline />
            </button>
            <button className="hover:text-black/40">
              <IoPaperPlaneOutline />
            </button>
          </div>
          <div>
            <button className="hover:text-black/40" onClick={handleSave}>
              {saved && <IoBookmarkSharp className="text-black" />}
              {!saved && <IoBookmarkOutline className="hover:text-black/40" />}
            </button>
          </div>
        </div>
        <div className="pb-2 leading-7 px-3 text-sm">
          <p className="font-semibold">{post?.likes.length}</p>
          <p>
            <span className="font-semibold">Venti</span> {post?.caption}
          </p>
          {/* comments here */}
          <p className="text-gray-400 font-light text-xs">2 days ago</p>
        </div>
      </main>
      <footer className="flex justify-between px-3 p-2 border border-t-gray-200">
        <div className="flex gap-x-2">
          <button>
            <VscSmiley className="text-2xl hover:text-black/40" />
          </button>
          <input type="text" placeholder="Add a comment" />
        </div>
        <button className="text-blue-300/80 font-semibold text-sm">Post</button>
      </footer>
    </div>
  );
};

export default Card;
