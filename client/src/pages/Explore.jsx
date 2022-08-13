import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import ImageCard from "../components/ProfilePages/ImageCard";
import Spinner from "../components/UI/Spinner";
import {
  getAllPosts,
  reGetAllPosts,
  resetPostList,
} from "../features/postList/postListSlice";

const Explore = () => {
  const dispatch = useDispatch();
  const { postList, isLoading, reGetIsLoading, maxPages } = useSelector(
    (state) => state.postList
  );
  const [currentPage, setCurrentPage] = useState(2);

  useEffect(() => {
    dispatch(getAllPosts());

    return () => {
      dispatch(resetPostList());
    };
  }, [dispatch]);

  const handleReGet = () => {
    console.log("ok");
    if (!reGetIsLoading && currentPage <= maxPages) {
      dispatch(reGetAllPosts(currentPage));
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="w-full">
        {isLoading && <Spinner />}
        <main className="grid grid-cols-3 gap-4">
          {!isLoading &&
            postList?.map((post, idx) => (
              <ImageCard post={post} key={post?._id} />
            ))}
        </main>
        <div className="w-full flex py-2 justify-center">
          {reGetIsLoading && <Spinner />}
          {!reGetIsLoading && currentPage <= maxPages && (
            <button className="actionBtn mx-auto" onClick={handleReGet}>
              Load More
            </button>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Explore;
