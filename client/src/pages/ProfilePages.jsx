import axios from "axios";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageCard from "../components/ProfilePages/ImageCard";
import ModalPostPF from "../components/ProfilePages/ModalPostPF";
import ModalTiny from "../components/UI/ModalTiny";
import ToggleFollowUnfollow from "../components/UI/ToggleFollowUnfollow";
import { getPersonalAccount, resetUser } from "../features/auth/userSlice";
import { useDisableBodyScroll } from "../hooks/preventWindowScroll";

const ProfilePages = () => {
  const params = useParams();
  const [showModal, setShowModal] = useState("");
  const [showModalPost, setShowModalPost] = useState({
    set: false,
    data: {},
  });
  const { user: ownUser, isSuccess: isSuccessUser } = useSelector(
    (state) => state.user
  );
  const { username } = params;
  const [otherUser, setOtherUser] = useState({});
  const [navigation, setNavigation] = useState("posts");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/api/user/" + username);

      console.log(res.data);
      setOtherUser(res.data);
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    dispatch(getPersonalAccount());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccessUser) {
      dispatch(resetUser());
    }
  }, [isSuccessUser, dispatch]);

  let user;

  const isOwnProfile = username === ownUser?.username;

  if (isOwnProfile) {
    user = ownUser;
  } else {
    user = otherUser;
  }

  useDisableBodyScroll(showModal);

  return (
    <>
      {showModal && (
        <ModalTiny
          content={showModal}
          followers={user?.followers}
          followings={user?.followings}
          setShowModal={setShowModal}
        />
      )}

      {showModalPost.set && (
        <ModalPostPF
          post={showModalPost.data}
          handleHideModal={() =>
            setShowModalPost((prev) => ({ ...prev, set: false }))
          }
        />
      )}

      <div className="w-full space-y-2">
        <div className="flex gap-x-2 mb-12">
          <div className="w-44 h-44 overflow-hidden rounded-full border border-gray-200 mx-12">
            <img
              src={user?.profilePicture}
              alt={user?.username}
              className="object-cover w-full h-full object-center"
            />
          </div>
          <div className="basis-[20rem] space-y-8">
            <div className="flex gap-x-4 items-center">
              <h2 className="text-4xl font-light">{user?.username}</h2>

              {!isOwnProfile && <ToggleFollowUnfollow following={user} />}
            </div>
            <div className="flex w-full justify-between">
              <p>
                <span className="font-semibold">{user?.posts?.length}</span>{" "}
                Posts
              </p>
              <p
                className="cursor-pointer"
                onClick={() => setShowModal("followers")}
              >
                <span className="font-semibold">{user?.followers?.length}</span>{" "}
                Followers
              </p>
              <p
                className="cursor-pointer"
                onClick={() => setShowModal("followings")}
              >
                <span className="font-semibold">
                  {user?.followings?.length}
                </span>{" "}
                Followings
              </p>
            </div>
            <h3 className="font-semibold text-xl">{user?.fullname}</h3>
          </div>
        </div>

        <div className="w-full border border-transparent border-t-gray-200 flex justify-center">
          <ul className="flex gap-x-12">
            <li
              className={`p-2 px-4  border border-transparent transition cursor-pointer ${
                navigation === "posts" && "border-t-black font-bold"
              }`}
              onClick={() => setNavigation("posts")}
            >
              Posts
            </li>
            <li
              className={`p-2 px-4  border border-transparent transition cursor-pointer ${
                navigation === "saved" && "border-t-black font-bold"
              }`}
              onClick={() => setNavigation("saved")}
            >
              Saved
            </li>
          </ul>
        </div>

        {/* posts or saved */}
        {navigation === "posts" && (
          <div className="grid grid-cols-3 gap-4">
            {user?.posts?.map((post) => (
              <ImageCard
                post={post}
                key={post?._id}
                setShowModalPost={setShowModalPost}
              />
            ))}
          </div>
        )}
        {navigation === "saved" && (
          <div className="grid grid-cols-3 gap-4">
            {user?.saved?.map((post) => (
              <ImageCard
                post={post}
                key={post?._id}
                setShowModalPost={setShowModalPost}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePages;
