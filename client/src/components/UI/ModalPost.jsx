import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideModalPost,
  likePostFollowing,
  savePostFollowing,
} from "../../features/post/postSlice";
import {
  IoHeartOutline,
  IoHeartSharp,
  IoChatbubbleOutline,
  IoPaperPlaneOutline,
  IoBookmarkOutline,
  IoBookmarkSharp,
} from "react-icons/io5";
import { VscSmiley } from "react-icons/vsc";

const ModalPost = () => {
  const dispatch = useDispatch();
  const { showModalPost } = useSelector((state) => state.postsFollowing);
  const { user } = useSelector((state) => state.user);
  const currentPost = showModalPost?.data;
  const [liked, setLiked] = useState(
    currentPost?.likes?.some((e) => e?._id === user?._id)
  );
  const [saved, setSaved] = useState(
    currentPost?.savedBy?.some((e) => e?._id === user?._id)
  );
  const [totalLikes, setTotalLikes] = useState(currentPost?.likes?.length);

  const handleHideModal = () => {
    dispatch(hideModalPost());
  };

  const handleSave = () => {
    setSaved((prev) => !prev);
    dispatch(savePostFollowing(currentPost?._id));
  };

  const handleLoves = () => {
    dispatch(likePostFollowing(currentPost?._id));

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

  console.log({ currentPost });

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
                <div className="flex gap-x-2">
                  <button>
                    <VscSmiley className="text-2xl hover:text-black/40" />
                  </button>
                  <input type="text" placeholder="Add a comment" />
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalPost;
