import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import userService from "./userService";

const initialStateUser = {
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// get personal account info
export const getPersonalAccount = createAsyncThunk(
  "user/personal",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await userService.getPersonalAccount(token);
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

// create post
export const createPost = createAsyncThunk(
  "user/createPost",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await userService.createPost(data, token);
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

// follow user
export const followUser = createAsyncThunk(
  "user/followuser",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await userService.followUser(userId, token);
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
export const unfollowUser = createAsyncThunk(
  "user/unfollowuser",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await userService.unfollowUser(userId, token);
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

const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  reducers: {
    resetUser: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (Builder) => {
    Builder.addCase(getPersonalAccount.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(getPersonalAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getPersonalAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.user.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.user.followings.push(action.payload.user);
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.user.followings = state.user.followings.filter(
          (following) => following._id !== action.payload.user._id
        );
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.message = action.payload;
      });
  },
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
