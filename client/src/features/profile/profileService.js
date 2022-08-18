import axios from "axios";

const API_URL = "/api/user/";

const getProfileInfo = async (username, token) => {
  const config = {
    Authorization: `Bearer ${token}`,
  };

  const res = await axios.get(API_URL + username, config);

  return res.data;
};

const profileService = {
  getProfileInfo,
};

export default profileService;
