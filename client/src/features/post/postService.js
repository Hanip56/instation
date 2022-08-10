import axios from "axios";

const API_URL = "/api/post/";

const getPostsFollowing = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL + "postsfollowing", config);

  return res.data;
};

const likePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let data = {};

  const res = await axios.put(
    API_URL + postId + "/likeandunlike",
    data,
    config
  );

  return res.data;
};

const savePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let data = {};

  const res = await axios.put(
    API_URL + postId + "/saveandunsave",
    data,
    config
  );

  return res.data;
};

const addComment = async (data, token) => {
  console.log({ dataFromService: data });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.put(
    API_URL + data.postId + "/addcomment",
    { comment: data.comment },
    config
  );

  console.log({ res });

  return res.data;
};

const postService = {
  getPostsFollowing,
  likePost,
  savePost,
  addComment,
};

export default postService;
