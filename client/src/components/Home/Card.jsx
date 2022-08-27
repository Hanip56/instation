import React, { useRef } from "react";
import { useState } from "react";
import {
  IoHeartOutline,
  IoHeartSharp,
  IoChatbubbleOutline,
  IoPaperPlaneOutline,
  IoBookmarkOutline,
  IoBookmarkSharp,
} from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { VscSmiley } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addComment,
  likePost,
  savePost,
  showModalPostList,
  showModalThreeDots,
} from "../../features/postList/postListSlice";
import { get_time_diff } from "../../utils/getTimeDiff";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useOutsideAlerter from "../../utils/ClickOutside";

const Card = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [showEmojiBox, setShowEmojiBox] = useState(false);
  const emojiBoxRef = useRef(null);

  const liked = post?.likes?.some((e) => e?._id === user?._id);

  const saved = post?.savedBy?.some((e) => e?._id === user?._id);

  const isCommented = post?.comments?.filter((e) => e?.user?._id === user?._id);

  const handleLoves = () => {
    dispatch(likePost(post._id));
  };
  const handleSave = () => {
    dispatch(savePost(post._id));
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (!comment) return;

    const data = {
      comment,
      postId: post?._id,
    };
    dispatch(addComment(data));
    setComment("");
  };

  const handleShowModal = () => {
    dispatch(showModalPostList(post));
  };

  const handleShowModalThreeDots = () => {
    dispatch(showModalThreeDots(post));
  };

  const postDate = new Date(post?.createdAt);

  const currentPostDate = get_time_diff(postDate);

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setComment(comment + emoji);
  };

  useOutsideAlerter(emojiBoxRef, setShowEmojiBox);

  return (
    <div className="w-[90%] sm:w-[32rem] mx-auto rounded-md border border-gray-300 bg-white">
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
        <div
          className="flex justify-center items-center mr-2 cursor-pointer"
          onClick={handleShowModalThreeDots}
        >
          <BsThreeDots />
        </div>
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
          <p className="font-semibold">{post?.likes.length} Likes</p>
          <p>
            <span className="font-semibold">{post?.postedBy?.username}</span>{" "}
            {post?.caption}
          </p>
          {post?.comments?.length > 0 && (
            <p className="text-sm my-1 text-gray-400">View all comments</p>
          )}
          {isCommented.length > 0 &&
            isCommented.map((comment, idx) => (
              <p key={idx}>
                <span className="font-bold">{comment?.user?.username} </span>
                {comment?.comment}
              </p>
            ))}
          <p
            className="text-gray-400 font-light text-xs"
            onClick={handleShowModal}
          >
            {currentPostDate}
          </p>
        </div>
      </main>
      <footer className="flex justify-between px-3 p-2 border border-t-gray-200">
        <form
          onSubmit={handleSubmitComment}
          className="relative w-full flex gap-x-2"
        >
          {showEmojiBox && (
            <div className="absolute top-8 -left-4" ref={emojiBoxRef}>
              <Picker
                data={data}
                onEmojiSelect={addEmoji}
                theme={"light"}
                emojiButtonSize={30}
                emojiSize={16}
              />
            </div>
          )}
          <button
            type="button"
            onClick={() => setShowEmojiBox((prev) => !prev)}
          >
            <VscSmiley className="text-2xl hover:text-black/40" />
          </button>
          <input
            className="w-full bg-transparent outline-none"
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className={`${
              comment ? "text-blue-400" : "text-blue-300/80"
            } font-semibold text-sm`}
          >
            Post
          </button>
        </form>
      </footer>
    </div>
  );
};

export default Card;
