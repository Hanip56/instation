import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ImageCard from "../components/ProfilePages/ImageCard";
import MessageBtn from "../components/ProfilePages/MessageBtn";
import ModalTiny from "../components/UI/ModalTiny";
import ToggleFollowUnfollow from "../components/UI/ToggleFollowUnfollow";
import { getPersonalAccount, resetUser } from "../features/auth/userSlice";
import {
  resetPostList,
  setPostListSync,
} from "../features/postList/postListSlice";
import { getProfileInfo } from "../features/profile/profileSlice";
import { useDisableBodyScroll } from "../hooks/preventWindowScroll";

const ProfilePages = () => {
  const params = useParams();
  const [showModal, setShowModal] = useState("");
  const { user: ownUser, isSuccess: isSuccessUser } = useSelector(
    (state) => state.user
  );
  const { postList } = useSelector((state) => state.postList);
  const { info } = useSelector((state) => state.profile);
  const { username } = params;
  const [navigation, setNavigation] = useState("posts");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersonalAccount());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProfileInfo(username));
    setShowModal("");
  }, [dispatch, username]);

  useEffect(() => {
    if (isSuccessUser) {
      dispatch(resetUser());
    }
  }, [isSuccessUser, dispatch]);

  const isOwnProfile = username === ownUser?.username;

  let user = isOwnProfile ? ownUser : info;

  useEffect(() => {
    let payload;

    navigation === "posts" ? (payload = user?.posts) : (payload = user?.saved);

    dispatch(setPostListSync(payload));

    return () => {
      dispatch(resetPostList());
    };
  }, [navigation, dispatch, user?.posts, user?.saved]);

  useDisableBodyScroll(showModal);

  const isFollowed = ownUser?.followings?.some(
    (f) => f?._id?.toString() === user?._id?.toString()
  );

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

      <div className="w-full space-y-2">
        <div className="flex gap-x-2 mb-6 md:mb-12">
          <div className="w-24 h-24 md:w-44 md:h-44 overflow-hidden rounded-full border border-gray-200 mx-2 md:mx-12">
            <img
              src={user?.profilePicture}
              alt={user?.username}
              className="object-cover w-full h-full object-center"
            />
          </div>
          <div className="basis-[20rem] space-y-8">
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <h2 className="text-2xl md:text-4xl font-light">
                {user?.username}
              </h2>

              <div className="flex flex-row gap-3 self-start">
                {!isOwnProfile && isFollowed && (
                  <Link to="/chat" className="ml-auto">
                    <MessageBtn following={user} />
                  </Link>
                )}
                {!isOwnProfile && <ToggleFollowUnfollow following={user} />}
              </div>
              {isOwnProfile && (
                <Link to="/edit" className="md:ml-auto">
                  <button className="actionBtn">Edit Profile</button>
                </Link>
              )}
            </div>
            <div className="flex w-full justify-around md:justify-between text-sm md:text-base">
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
            <h3 className="font-semibold text-base md:text-xl">
              {user?.fullname}
            </h3>
            <p>{user?.porfileBio}</p>
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

        <div className="grid grid-cols-3 gap-4">
          {postList?.map((post) => (
            <ImageCard post={post} key={post?._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfilePages;
