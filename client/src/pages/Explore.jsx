import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import ImageCard from "../components/ProfilePages/ImageCard";
import Spinner from "../components/UI/Spinner";
import { getAllPosts, resetPostList } from "../features/postList/postListSlice";

const Explore = () => {
  const dispatch = useDispatch();
  const { postList, isLoading } = useSelector((state) => state.postList);

  useEffect(() => {
    dispatch(getAllPosts());

    return () => {
      dispatch(resetPostList());
    };
  }, [dispatch]);

  return (
    <>
      <div className="w-full">
        {isLoading && <Spinner />}
        <main className="grid grid-cols-3 gap-4">
          {!isLoading &&
            postList?.map((post) => <ImageCard post={post} key={post?._id} />)}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Explore;
