import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import exploreService from "./exploreService";

const initialState = {
  posts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAllPosts = createAsyncThunk(
  "explore/allpost",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await exploreService.getAllPosts(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const likePostExplore = createAsyncThunk(
  "explore/likeandunlike",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await exploreService.likePost(postId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const savePostExplore = createAsyncThunk(
  "explore/saveandunsave",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await exploreService.savePost(postId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addComment = createAsyncThunk(
  "explore/addcomment",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await exploreService.addComment(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {
    resetExplore: () => initialState,
  },
  extraReducers: (Builder) => {
    Builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likePostExplore.fulfilled, (state, action) => {
        const posts = current(state);
        const filteredPosts = posts?.posts?.filter(
          (post) => post._id.toString() === action.payload.id.toString()
        );
        const filteredPostsIndex = posts?.posts?.findIndex(
          (post) => post._id.toString() === action.payload.id.toString()
        );

        const exist = filteredPosts[0]?.likes?.findIndex(
          (like) => like._id.toString() === action.payload.user._id.toString()
        );

        if (exist > -1) {
          state.posts[filteredPostsIndex].likes = state.posts[
            filteredPostsIndex
          ]?.likes.filter(
            (like) => like._id.toString() !== action.payload.user._id.toString()
          );
        } else {
          // state.postsFollowing.posts[filteredPostsIndex].likes =
          state.posts[filteredPostsIndex]?.likes.push(action.payload.user);
        }
      })
      .addCase(savePostExplore.fulfilled, (state, action) => {
        const posts = current(state);
        const filteredPosts = posts?.posts?.filter(
          (post) => post._id.toString() === action.payload.id.toString()
        );
        const filteredPostsIndex = posts?.posts?.findIndex(
          (post) => post._id.toString() === action.payload.id.toString()
        );

        const exist = filteredPosts[0]?.savedBy?.findIndex(
          (save) => save._id?.toString() === action.payload.user._id?.toString()
        );

        if (exist > -1) {
          state.posts[filteredPostsIndex].savedBy = state.posts[
            filteredPostsIndex
          ]?.savedBy.filter(
            (save) => save._id.toString() !== action.payload.user._id.toString()
          );
        } else {
          state.posts[filteredPostsIndex]?.savedBy.push(action.payload.user);
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const posts = current(state);

        const filteredPostsIndex = posts?.posts?.findIndex(
          (post) => post?._id?.toString() === action.payload.data.id?.toString()
        );

        state.posts[filteredPostsIndex]?.comments?.push(action.payload.data);
      });
  },
});

export const { resetExplore } = exploreSlice.actions;

export default exploreSlice.reducer;
