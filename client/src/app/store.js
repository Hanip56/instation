import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/auth/userSlice";
import { createPostSliceReducer } from "../features/post/postSlice";
import profileReducer from "../features/profile/profileSlice";
import postListReducer from "../features/postList/postListSlice";
import chattingReducer from "../features/chatting/chattingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    createPost: createPostSliceReducer,
    profile: profileReducer,
    postList: postListReducer,
    chatting: chattingReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
