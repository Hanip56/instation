import React from "react";
import Card from "../components/Home/Card";
import ventiSmall from "../assets/images/venti.png";
import { Link } from "react-router-dom";
import { posts } from "../data/charGenshin";

const Home = () => {
  return (
    <div className="w-full flex justify-between gap-x-5">
      <div className="flex-1 w-full h-32 flex flex-col gap-y-4">
        {posts.map((post) => (
          <Card post={post} />
        ))}
      </div>
      <aside className="hidden lg:block basis-2/5 w-full h-32 p-1">
        {/* account */}
        <div className="flex w-full h-20 gap-x-2 items-center justify-between">
          <div className="flex items-center gap-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200">
              <img src={ventiSmall} alt="venti" />
            </div>
            <div>
              <h4 className="font-semibold">Venti</h4>
              <p className="text-gray-500 text-sm">Archon Mondstadt</p>
            </div>
          </div>
          <button className="listBtn">Switch</button>
        </div>
        {/* end account */}

        {/* suggestion */}
        <div className="h-72">
          <h4 className="font-semibold text-gray-500">Suggestions for you</h4>
          <div>{/* here suggestion other account */}</div>
        </div>

        {/* footer */}
        <div className=" text-gray-500/50 ">
          <div className="text-xs leading-6">
            <Link to="/about">About</Link> -<Link to="/about">Help</Link> -
            <Link to="/about">Press</Link> -<Link to="/about">API</Link> -
            <Link to="/about">Jobs</Link> -<Link to="/about">Privacy</Link> -
            <Link to="/about">Terms</Link> -<Link to="/about">Locations</Link> -
            <Link to="/about">Language</Link>
          </div>
          <h4 className="text-sm mt-3">c 2022 INSTAGRAM FROM META</h4>
        </div>
      </aside>
    </div>
  );
};

export default Home;
