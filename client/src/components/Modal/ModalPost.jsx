import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  hideModalPostList,
  likePost,
  savePost,
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

  return (
    <>
      <div
        className="fixed z-[45] w-screen h-screen bg-black/60 left-0 top-0"
        onClick={handleHideModal}
      ></div>

      <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-50 flex justify-center items-center rounded-md">
        <div className="flex w-[80vw] lg:w-[80vw] bg-white h-[90vh] rounded-md overflow-hidden">
          <div className="basis-[65%] bg-black">
            <div className="w-full h-full">
              <img
                src={currentPost?.image}
                alt={currentPost?.caption}
                className="w-full h-full object-contain object-center"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <header className="flex py-2 px-4 gap-x-2 border border-transparent border-b-gray-200">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={currentPost?.postedBy?.profilePicture}
                  alt={currentPost?.postedBy?.username}
                />
              </div>
              <div>
                <h4 className="font-semibold">
                  {currentPost?.postedBy?.username}
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
                      <span
                        className="text-xs cursor-pointer"
                        onClick={handleUnfollow}
                      >
                        {" "}
                        . Following
                      </span>
                    )
                  )}
                </h4>
              </div>
            </header>
            <main className="p-2 px-4 flex-1 border border-transparent border-b-gray-200">
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
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img
                        src={comment?.user?.profilePicture}
                        alt={comment?.user?.username}
                      />
                    </div>
                    <div>
                      <p>
                        <span className="font-semibold">
                          {comment?.user?.username}
                        </span>{" "}
                        {comment?.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </main>
            <footer className="p-2 space-y-2">
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
                <p className="font-light text-gray-500 text-xs">20 hours ago</p>
              </div>
              <div className="border border-transparent border-t-gray-200 py-2">
                <form
                  onSubmit={handleSubmitComment}
                  className="w-full flex gap-x-2"
                >
                  <button type="button">
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
                    className="text-blue-300/80 font-semibold text-sm"
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
