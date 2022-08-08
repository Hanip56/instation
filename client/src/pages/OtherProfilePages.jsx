import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const OtherProfilePages = () => {
  const { user } = useSelector((state) => state.user);
  const [navigation, setNavigation] = useState("posts");

  return (
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
          <h2 className="text-4xl font-light">{user?.username}</h2>
          <div className="flex w-full justify-between">
            <p>
              <span className="font-semibold">{user?.posts?.length}</span> Posts
            </p>
            <p>
              <span className="font-semibold">{user?.followers?.length}</span>{" "}
              Followers
            </p>
            <p>
              <span className="font-semibold">{user?.followings?.length}</span>{" "}
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
            <div className="">
              <img
                src={post?.image}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      )}
      {navigation === "saved" && (
        <div className="grid grid-cols-3 gap-4">
          {user?.saved?.map((post) => (
            <div className="">
              <img
                src={post.image}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OtherProfilePages;
