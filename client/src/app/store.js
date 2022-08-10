import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/auth/userSlice";
import {
  postsFollowingReducer,
  createPostSliceReducer,
} from "../features/post/postSlice";
import exploreReducer from "../features/explore/exploreSlice";

console.log(postsFollowingReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    postsFollowing: postsFollowingReducer,
    createPost: createPostSliceReducer,
    explore: exploreReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
