import React from "react";
import Card from "../components/Home/Card";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout } from "../features/auth/authSlice";
import Spinner from "../components/UI/Spinner";
import { resetUser } from "../features/auth/userSlice";
import {
  getPostsFollowing,
  reGetPostsFollowing,
  resetPostList,
} from "../features/postList/postListSlice";
import { useState } from "react";
import SkeletonPost from "../components/Layouts/SkeletonPost";
import SkeletonProfile from "../components/Layouts/SkeletonProfile";

const Home = () => {
  const dispatch = useDispatch();
  const {
    user,
    isSuccess: isSuccessUser,
    isLoading: isLoadingUser,
  } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(2);
  const {
    postList,
    isLoading: isLoadingPF,
    reGetIsLoading,
    maxPages,
  } = useSelector((state) => state.postList);

  // handle load more content when reach the end scrollbar
  useEffect(() => {
    const handleScroll = () => {
      const maxScrollY =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (
        window.scrollY >= maxScrollY &&
        !reGetIsLoading &&
        currentPage <= maxPages
      ) {
        dispatch(reGetPostsFollowing(currentPage));
        setCurrentPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, dispatch, reGetIsLoading, maxPages]);

  useEffect(() => {
    dispatch(getPostsFollowing());

    return () => {
      dispatch(resetPostList());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSuccessUser) {
      dispatch(resetUser());
    }
  }, [isSuccessUser, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="w-full flex justify-between gap-x-5">
        <div className="flex-1 w-full flex flex-col gap-y-4 pb-20">
          {isLoadingPF &&
            Array(4)
              .fill("")
              .map((el, i) => <SkeletonPost key={i} />)}
          {!isLoadingPF && postList?.length < 1 && (
            <h1>There's no post, Let's Follow someone!!</h1>
          )}
          {!isLoadingPF && (
            <>
              {postList?.map((post) => (
                <Card post={post} key={post._id} />
              ))}
              {reGetIsLoading && <Spinner />}
            </>
          )}
        </div>
        <aside className="hidden lg:block basis-2/5 w-full h-32 p-1">
          {/* account */}
          <div className="flex w-full h-20 gap-x-2 items-center justify-between">
            {isLoadingUser && <SkeletonProfile />}
            {!isLoadingUser && (
              <Link to={`/${user?.username}`}>
                <div className="flex items-center gap-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200">
                    <img
                      src={user?.profilePicture}
                      alt={user?.username}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{user?.username}</h4>
                    <p className="text-gray-500 text-sm">{user?.fullname}</p>
                  </div>
                </div>
              </Link>
            )}
            <button className="listBtn" onClick={handleLogout}>
              LOGOUT
            </button>
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
              <Link to="#">About</Link> -<Link to="#">Help</Link> -
              <Link to="#">Press</Link> -<Link to="#">API</Link> -
              <Link to="#">Jobs</Link> -<Link to="#">Privacy</Link> -
              <Link to="#">Terms</Link> -<Link to="#">Locations</Link> -
              <Link to="#">Language</Link>
            </div>
            <h4 className="text-sm mt-3">© 2022 INSTATION</h4>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Home;
