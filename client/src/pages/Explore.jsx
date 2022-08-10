import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalPostEx from "../components/Explore/ModalPostEx";
import ImageCard from "../components/ProfilePages/ImageCard";
import { getAllPosts } from "../features/explore/exploreSlice";
import { useDisableBodyScroll } from "../hooks/preventWindowScroll";

const Explore = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.explore);
  const [showModalEx, setShowModalEx] = useState({
    set: false,
    data: {},
  });

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useDisableBodyScroll(showModalEx.set);

  return (
    <>
      {showModalEx.set && (
        <ModalPostEx
          post={showModalEx.data}
          handleHideModal={() =>
            setShowModalEx((prev) => ({ ...prev, set: false }))
          }
        />
      )}
      <div className="w-full">
        <main className="grid grid-cols-3 gap-4">
          {posts?.map((post) => (
            <ImageCard
              post={post}
              key={post?._id}
              setShowModalPost={setShowModalEx}
            />
          ))}
        </main>
        <footer></footer>
      </div>
    </>
  );
};

export default Explore;
