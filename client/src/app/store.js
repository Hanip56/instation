import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/auth/userSlice";
import {
  postsFollowingReducer,
  createPostSliceReducer,
} from "../features/post/postSlice";

console.log(postsFollowingReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    postsFollowing: postsFollowingReducer,
    createPost: createPostSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
