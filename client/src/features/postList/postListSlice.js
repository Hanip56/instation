import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import postListService from "./postListService";

const initialState = {
  postList: [],
  maxPages: 1,
  showModalPostList: {
    set: false,
    data: {},
  },
  showModalThreeDots: {
    set: false,
    data: {},
  },
  showModalOptions: {
    set: false,
    data: {},
  },
  isLoading: false,
  isError: false,
  isSuccess: false,
  deletedIsSuccess: false,
  updatedIsSuccess: false,
  reGetIsLoading: false,
  message: "",
};

export const getPostsFollowing = createAsyncThunk(
  "postList/postsfollowing",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await postListService.getPostsFollowing(token);
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

export const reGetPostsFollowing = createAsyncThunk(
  "postList/reGetPostsfollowing",
  async (page, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await postListService.reGetPostsFollowing(page, token);
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

export const getAllPosts = createAsyncThunk(
  "explore/allpost",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await postListService.getAllPosts(token);
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
export const reGetAllPosts = createAsyncThunk(
  "explore/reGetAllpost",
  async (page, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await postListService.getAllPosts(page, token);
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

export const likePost = createAsyncThunk(
  "postList/likeandunlike",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await postListService.likePost(postId, token);
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

export const savePost = createAsyncThunk(
  "postList/saveandunsave",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await postListService.savePost(postId, token);
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
  "postList/addcomment",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await postListService.addComment(data, token);
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

export const deletePost = createAsyncThunk(
  "postList/delete",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await postListService.deletePost(postId, token);
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

export const updatePost = createAsyncThunk(
  "postList/update",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await postListService.updatePost(data, token);
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

const postListSlice = createSlice({
  name: "postList",
  initialState,
  reducers: {
    resetPostList: (state) => {
      state.postList = [];
      state.showModalPostList = {
        set: false,
        data: {},
      };
      state.maxPages = 1;
      state.reGetIsLoading = false;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.deletedIsSuccess = false;
      state.updatedIsSuccess = false;
      state.message = "";
    },
    resetStatePostList: (state) => {
      state.postList = [];
      state.showModalPostList = {
        set: false,
        data: {},
      };
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    showModalPostList: (state, action) => {
      state.showModalPostList.data = action.payload;
      state.showModalPostList.set = true;
      state.deletedIsSuccess = false;
      state.updatedIsSuccess = false;
    },
    hideModalPostList: (state) => {
      state.showModalPostList.data = {};
      state.showModalPostList.set = false;
    },
    showModalThreeDots: (state, action) => {
      state.showModalThreeDots.data = action.payload;
      state.showModalThreeDots.set = true;
    },
    hideModalThreeDots: (state) => {
      state.showModalThreeDots.data = {};
      state.showModalThreeDots.set = false;
    },
    showModalOptions: (state, action) => {
      state.showModalOptions.data = action.payload;
      state.showModalOptions.set = true;
    },
    hideModalOptions: (state) => {
      state.showModalOptions.data = {};
      state.showModalOptions.set = false;
    },
    setPostListSync: (state, action) => {
      state.postList = action.payload;
    },
  },
  extraReducers: (Builder) => {
    Builder.addCase(getPostsFollowing.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(getPostsFollowing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.postList = action.payload.posts;
        state.maxPages = action.payload.maxPages;
      })
      .addCase(getPostsFollowing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.postList = state.postList.filter(
          (post) => post._id !== action.payload
        );
        state.deletedIsSuccess = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const currentState = current(state);
        const index = currentState.postList.findIndex(
          (post) => post._id === action.payload.id
        );

        state.postList[index].caption = action.payload.caption;
        state.updatedIsSuccess = true;
      })
      .addCase(reGetPostsFollowing.pending, (state) => {
        state.reGetIsLoading = true;
      })
      .addCase(reGetPostsFollowing.fulfilled, (state, action) => {
        state.reGetIsLoading = false;
        state.postList = [...state.postList, ...action.payload.posts];
      })
      .addCase(reGetAllPosts.pending, (state) => {
        state.reGetIsLoading = true;
      })
      .addCase(reGetAllPosts.fulfilled, (state, action) => {
        state.reGetIsLoading = false;
        state.postList = [...state.postList, ...action.payload.posts];
      })
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.postList = action.payload.posts;
        state.maxPages = action.payload.maxPages;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const currentState = current(state);
        const filteredPosts = currentState.postList?.filter(
          (post) => post._id.toString() === action.payload.id.toString()
        );
        const filteredPostsIndex = currentState?.postList?.findIndex(
          (post) => post._id.toString() === action.payload.id.toString()
        );

        const exist = filteredPosts[0]?.likes?.findIndex(
          (like) => like._id.toString() === action.payload.user._id.toString()
        );

        if (exist > -1) {
          state.postList[filteredPostsIndex].likes = state.postList[
            filteredPostsIndex
          ]?.likes.filter(
            (like) => like._id.toString() !== action.payload.user._id.toString()
          );
        } else {
          state.postList[filteredPostsIndex]?.likes.push(action.payload.user);
        }
      })
      .addCase(savePost.fulfilled, (state, action) => {
        const currentState = current(state);
        const filteredPosts = currentState.postList?.filter(
          (post) => post._id.toString() === action.payload.id.toString()
        );
        const filteredPostsIndex = currentState.postList?.findIndex(
          (post) => post._id.toString() === action.payload.id.toString()
        );

        const exist = filteredPosts[0]?.savedBy?.findIndex(
          (save) => save._id?.toString() === action.payload.user._id?.toString()
        );

        if (exist > -1) {
          state.postList[filteredPostsIndex].savedBy = state.postList[
            filteredPostsIndex
          ]?.savedBy.filter(
            (save) => save._id.toString() !== action.payload.user._id.toString()
          );
        } else {
          state.postList[filteredPostsIndex]?.savedBy.push(action.payload.user);
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const posts = current(state);
        const filteredPostsIndex = posts?.postList?.findIndex(
          (post) => post?._id?.toString() === action.payload.data.id?.toString()
        );

        state.postList[filteredPostsIndex]?.comments?.push(action.payload.data);
        state.showModalPostList?.data?.comments?.push(action.payload.data);
      });
  },
});

export const {
  resetPostList,
  resetStatePostList,
  showModalPostList,
  hideModalPostList,
  setPostListSync,
  showModalThreeDots,
  hideModalThreeDots,
  showModalOptions,
  hideModalOptions,
} = postListSlice.actions;

export default postListSlice.reducer;
