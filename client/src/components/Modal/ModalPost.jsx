import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  hideModalPostList,
  likePost,
  savePost,
  showModalOptions,
} from "../../features/postList/postListSlice";
import {
  IoHeartOutline,
  IoHeartSharp,
  IoChatbubbleOutline,
  IoPaperPlaneOutline,
  IoBookmarkOutline,
  IoBookmarkSharp,
} from "react-icons/io5";
import { VscSmiley } from "react-icons/vsc";
import { followUser, unfollowUser } from "../../features/auth/userSlice";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useOutsideAlerter from "../../utils/ClickOutside";
import { get_time_diff } from "../../utils/getTimeDiff";

const ModalPost = () => {
  const dispatch = useDispatch();
  const { showModalPostList } = useSelector((state) => state.postList);
  const { user } = useSelector((state) => state.user);
  const currentPost = showModalPostList?.data;
  const [liked, setLiked] = useState(
    currentPost?.likes?.some((e) => e?._id === user?._id)
  );
  const [saved, setSaved] = useState(
    currentPost?.savedBy?.some((e) => e?._id === user?._id)
  );
  const [totalLikes, setTotalLikes] = useState(currentPost?.likes?.length);
  const [comment, setComment] = useState("");
  const [showEmojiBox, setShowEmojiBox] = useState(false);
  const emojiBoxRef = useRef(null);

  const handleHideModal = () => {
    dispatch(hideModalPostList());
  };

  const handleSave = () => {
    setSaved((prev) => !prev);
    dispatch(savePost(currentPost?._id));
  };

  const handleLoves = () => {
    dispatch(likePost(currentPost?._id));

    setLiked((prev) => {
      if (prev) {
        setTotalLikes((prev) => prev - 1);
        return false;
      } else {
        setTotalLikes((prev) => prev + 1);
        return true;
      }
    });
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (!comment) return;

    const data = {
      comment,
      postId: currentPost?._id,
    };
    dispatch(addComment(data));
    setComment("");
  };

  const isOwnUser =
    currentPost?.postedBy?._id?.toString() === user?._id?.toString();

  const isFollowed = user?.followings?.some(
    (e) => e._id?.toString() === currentPost?.postedBy?._id?.toString()
  );

  const handleFollow = () => {
    dispatch(followUser(currentPost?.postedBy?._id));
  };
  const handleUnfollow = () => {
    dispatch(unfollowUser(currentPost?.postedBy?._id));
  };

  const handleShowModalOptions = () => {
    dispatch(showModalOptions(currentPost));
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setComment(comment + emoji);
  };

  const postDate = new Date(currentPost?.createdAt);

  const currentPostDate = get_time_diff(postDate);

  useOutsideAlerter(emojiBoxRef, setShowEmojiBox);

  const headerEl = (
    <header className="flex py-2 px-4 gap-x-2 border border-transparent border-b-gray-200">
      <Link to={`/${currentPost?.postedBy?.username}`}>
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src={currentPost?.postedBy?.profilePicture}
            alt={currentPost?.postedBy?.username}
          />
        </div>
      </Link>
      <div>
        <h4 className="font-semibold">
          <Link to={`/${currentPost?.postedBy?.username}`}>
            <span>{currentPost?.postedBy?.username}</span>
          </Link>

          {!isFollowed && !isOwnUser ? (
            <span
              className="text-xs text-blue-ig cursor-pointer"
              onClick={handleFollow}
            >
              {" "}
              . Follow
            </span>
          ) : (
            !isOwnUser && (
              <span className="text-xs cursor-pointer" onClick={handleUnfollow}>
                {" "}
                . Following
              </span>
            )
          )}
        </h4>
      </div>
      <div
        className="w-6 h-6 flex justify-center items-center ml-auto cursor-pointer"
        onClick={handleShowModalOptions}
      >
        {isOwnUser && <BsThreeDots />}
      </div>
    </header>
  );

  return (
    <>
      <div
        className="fixed z-[45] w-screen h-screen bg-black/60 left-0 top-0"
        onClick={handleHideModal}
      ></div>

      <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-50 flex justify-center items-center rounded-md">
        <div className="flex flex-col sm:flex-row w-[80vw] lg:w-[80vw] bg-white h-[80vh] sm:h-[90vh] rounded-md overflow-hidden justify-between">
          <div className="block sm:hidden">{headerEl}</div>

          <div className="basis-[75%] sm:basis-[65%] bg-black overflow-hidden">
            <div className="w-full h-full">
              <img
                src={currentPost?.image}
                alt={currentPost?.caption}
                className="w-full h-full object-contain object-center"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="hidden sm:block">{headerEl}</div>
            <main className="hidden sm:block p-2 px-4 basis-[80%] border border-transparent border-b-gray-200">
              <div className="flex gap-x-4">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={currentPost?.postedBy?.profilePicture}
                    alt={currentPost?.postedBy?.username}
                  />
                </div>
                <div>
                  <p>
                    <span className="font-semibold">
                      {currentPost?.postedBy?.username}
                    </span>{" "}
                    {currentPost?.caption}
                  </p>
                </div>
              </div>
              {/* comments here */}
              <div className="space-y-4 mt-6 max-h-[26rem] overflow-y-scroll">
                {currentPost?.comments?.map((comment) => (
                  <div className="flex gap-x-4" key={comment._id}>
                    <Link to={`/${comment?.user?.username}`}>
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img
                          src={comment?.user?.profilePicture}
                          alt={comment?.user?.username}
                        />
                      </div>
                    </Link>
                    <div>
                      <p>
                        <Link to={`/${comment?.user?.username}`}>
                          <span className="font-semibold">
                            {comment?.user?.username}
                          </span>{" "}
                        </Link>

                        {comment?.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </main>
            <footer className="basis-[20%] p-4 flex flex-col justify-between gap-y-3">
              <div className="flex items-center gap-x-4 text-2xl">
                <button onClick={handleLoves}>
                  {liked && <IoHeartSharp className="text-red-500" />}
                  {!liked && <IoHeartOutline className="hover:text-black/40" />}
                </button>
                <button className="hover:text-black/40">
                  <IoChatbubbleOutline />
                </button>
                <button className="hover:text-black/40">
                  <IoPaperPlaneOutline />
                </button>
                <button
                  className="hover:text-black/40 ml-auto"
                  onClick={handleSave}
                >
                  {saved && <IoBookmarkSharp className="text-black" />}
                  {!saved && (
                    <IoBookmarkOutline className="hover:text-black/40" />
                  )}
                </button>
              </div>
              <div>
                <p className="font-semibold">
                  {totalLikes}
                  <span> Likes</span>
                </p>
              </div>
              <div>
                <p className="font-light text-gray-500 text-xs">
                  {currentPostDate}
                </p>
              </div>
              <div className="hidden sm:block border border-transparent border-t-gray-200 py-2">
                <form
                  onSubmit={handleSubmitComment}
                  className="relative w-full flex gap-x-2"
                >
                  {showEmojiBox && (
                    <div
                      className="absolute bottom-8 -left-32"
                      ref={emojiBoxRef}
                    >
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
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalPost;
