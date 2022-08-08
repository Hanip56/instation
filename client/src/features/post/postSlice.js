import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import postService from "./postService";

// posts following
const initialStatePF = {
  postsFollowing: [],
  showModalPost: {
    set: false,
    data: {},
  },
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getPostsFollowing = createAsyncThunk(
  "post/postsfollowing",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await postService.getPostsFollowing(token);
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

export const likePostFollowing = createAsyncThunk(
  "post/likeandunlike",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await postService.likePost(postId, token);
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

export const savePostFollowing = createAsyncThunk(
  "post/saveandunsave",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await postService.savePost(postId, token);
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

const postsFollowingSlice = createSlice({
  name: "postsFollowing",
  initialState: initialStatePF,
  reducers: {
    resetPF: (state) => {
      state.isError = false;
    },
    showModalPost: (state, action) => {
      state.showModalPost.data = action.payload;
      state.showModalPost.set = true;
    },
    hideModalPost: (state) => {
      state.showModalPost.data = {};
      state.showModalPost.set = false;
    },
  },
  extraReducers: (Builder) => {
    Builder.addCase(getPostsFollowing.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(getPostsFollowing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.postsFollowing = action.payload;
      })
      .addCase(getPostsFollowing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likePostFollowing.fulfilled, (state, action) => {
        const posts = current(state);
        const filteredPosts = posts.postsFollowing.posts?.filter(
          (post) => post._id.toString() === action.payload.id.toString()
        );
        const filteredPostsIndex = posts?.postsFollowing?.posts?.findIndex(
          (post) => post._id.toString() === action.payload.id.toString()
        );

        const exist = filteredPosts[0]?.likes?.findIndex(
          (like) => like._id.toString() === action.payload.user._id.toString()
        );

        if (exist > -1) {
          state.postsFollowing.posts[filteredPostsIndex].likes =
            state.postsFollowing.posts[filteredPostsIndex]?.likes.filter(
              (like) =>
                like._id.toString() !== action.payload.user._id.toString()
            );
        } else {
          // state.postsFollowing.posts[filteredPostsIndex].likes =
          state.postsFollowing.posts[filteredPostsIndex]?.likes.push(
            action.payload.user
          );
        }
      })
      .addCase(savePostFollowing.fulfilled, (state, action) => {
        const posts = current(state);
        const filteredPosts = posts.postsFollowing.posts?.filter(
          (post) => post._id.toString() === action.payload.id.toString()
        );
        const filteredPostsIndex = posts?.postsFollowing?.posts?.findIndex(
          (post) => post._id.toString() === action.payload.id.toString()
        );

        const exist = filteredPosts[0]?.savedBy?.findIndex(
          (save) => save._id?.toString() === action.payload.user._id?.toString()
        );

        if (exist > -1) {
          state.postsFollowing.posts[filteredPostsIndex].savedBy =
            state.postsFollowing.posts[filteredPostsIndex]?.savedBy.filter(
              (save) =>
                save._id.toString() !== action.payload.user._id.toString()
            );
        } else {
          state.postsFollowing.posts[filteredPostsIndex]?.savedBy.push(
            action.payload.user
          );
        }
      });
  },
});

export const { resetPF, showModalPost, hideModalPost } =
  postsFollowingSlice.actions;
export const postsFollowingReducer = postsFollowingSlice.reducer;

// create post
const initialStateCP = {
  data: {},
  showModal: false,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const createPostSlice = createSlice({
  name: "createPost",
  initialState: initialStateCP,
  reducers: {
    resetCP: () => initialStateCP,
    showModalCP: (state) => {
      state.showModal = true;
    },
    hideModalCP: (state) => {
      state.showModal = false;
    },
  },
  extraReducers: () => {},
});

export const { resetCP, showModalCP, hideModalCP } = createPostSlice.actions;
export const createPostSliceReducer = createPostSlice.reducer;
