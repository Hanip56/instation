import axios from "axios";

const getConversation = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get("/api/conversation", config);

  const dataArr = res?.data?.map((d) => ({ _id: d._id, members: d.members }));

  return dataArr;
};

const addConversation = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post("/api/conversation", data, config);

  return res.data;
};

const deleteConversation = async (conversationId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.delete("/api/conversation/" + conversationId, config);

  return res.data;
};

const getMessages = async (conversationId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get("/api/message/" + conversationId, config);

  return res.data;
};

const sendMessages = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post("/api/message", data, config);

  return res.data;
};

const chattingService = {
  getConversation,
  addConversation,
  getMessages,
  sendMessages,
  deleteConversation,
};

export default chattingService;
