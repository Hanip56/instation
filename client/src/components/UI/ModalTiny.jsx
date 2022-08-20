import FollowerCard from "../ProfilePages/FollowerCard";
import { IoCloseOutline } from "react-icons/io5";
import FollowingCard from "../ProfilePages/FollowingCard";

const ModalTiny = ({ followers, followings, content, setShowModal }) => {
  return (
    <>
      <div
        className="fixed z-[45] w-screen h-screen bg-black/60 left-0 top-0"
        onClick={() => setShowModal("")}
      ></div>

      <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-50 flex justify-center items-center rounded-md">
        <div className="w-[22rem] sm:w-[25rem] bg-white h-60 rounded-md overflow-hidden">
          <header className="text-center py-2 px-4 font-semibold border border-transparent border-b-gray-300">
            {content === "followers" && <h4>Follower</h4>}
            {content === "followings" && <h4>Followings</h4>}
            <IoCloseOutline
              className="absolute top-2 right-2 text-2xl cursor-pointer"
              onClick={() => setShowModal("")}
            />
          </header>
          <main className="h-48 overflow-y-scroll space-y-2">
            {content === "followers" &&
              followers.map((follower) => (
                <FollowerCard
                  follower={follower}
                  key={follower._id}
                  setShowModal={setShowModal}
                />
              ))}
            {content === "followings" &&
              followings.map((following) => (
                <FollowingCard following={following} key={following._id} />
              ))}
          </main>
        </div>
      </div>
    </>
  );
};

export default ModalTiny;
