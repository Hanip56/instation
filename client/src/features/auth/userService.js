import axios from "axios";

const API_URL = "/api/user/";

const getPersonalAccount = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL + "personal", config);

  return res.data;
};
const followUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {};

  const res = await axios.put(API_URL + userId + "/follow", data, config);

  return res.data;
};
const unfollowUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {};

  const res = await axios.put(API_URL + userId + "/unfollow", data, config);

  return res.data;
};

// create post
const createPost = async (data, token) => {
  const res = await axios({
    url: "http://localhost:5000/api/post/add",
    method: "POST",
    data,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const userService = {
  createPost,
  getPersonalAccount,
  followUser,
  unfollowUser,
};

export default userService;
