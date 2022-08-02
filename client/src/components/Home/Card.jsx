import React from "react";

const Card = ({ post }) => {
  return (
    <div className="max-w-lg mx-auto rounded-md border border-gray-300">
      <header className="w-full h-14 flex justify-between items-center px-2">
        <div className="flex items-center gap-x-2">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={post.profile_picture}
              alt="venti"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col justify-between">
            <h4 className="font-medium ">{post.postedBy}</h4>
            <p className="font-light text-sm">{post.at}</p>
          </div>
        </div>
        <div className="flex justify-center items-center">...</div>
      </header>
      <main>
        <div className="w-full max-h-[30rem] overflow-hidden">
          <img
            src={post.post}
            alt="bowl"
            className="object-contain w-full h-full object-center"
          />
        </div>
        <div className="flex items-center justify-between p-2 px-3">
          <div className="flex items-center gap-x-2">
            <p>Likes</p>
            <p>Comments</p>
            <p>Send</p>
          </div>
          <div>
            <p>Save</p>
          </div>
        </div>
        <div className="pb-2 leading-7 px-3 text-sm">
          <p className="font-semibold">1,999 Likes</p>
          <p>
            <span className="font-semibold">Venti</span> {post.postDesc}
          </p>
          {/* comments here */}
          <p className="text-gray-400 font-light text-xs">2 days ago</p>
        </div>
      </main>
      <footer className="flex justify-between px-3 p-2 border border-t-gray-200">
        <div className="flex gap-x-2">
          <div>Smile</div>
          <input type="text" placeholder="Add a comment" />
        </div>
        <button className="text-blue-300/80 font-semibold text-sm">Post</button>
      </footer>
    </div>
  );
};

export default Card;
