import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import ImageCard from "../components/ProfilePages/ImageCard";

const Explore = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/post/all");

      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <div className="w-full">
      <main className="grid grid-cols-3 gap-4">
        {posts?.map((post) => (
          <ImageCard post={post} key={post?._id} />
        ))}
      </main>
      <footer></footer>
    </div>
  );
};

export default Explore;
