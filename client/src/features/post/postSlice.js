import { createSlice } from "@reduxjs/toolkit";

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
