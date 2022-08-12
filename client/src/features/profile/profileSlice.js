import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";

const initialState = {
  info: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getProfileInfo = createAsyncThunk(
  "profile/getprofileinfo",
  async (username, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await profileService.getProfileInfo(username, token);
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

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfile: () => initialState,
  },
  extraReducers: (Builder) => {
    Builder.addCase(getProfileInfo.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(getProfileInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.info = action.payload;
      })
      .addCase(getProfileInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetProfile } = profileSlice.actions;

export default profileSlice.reducer;
