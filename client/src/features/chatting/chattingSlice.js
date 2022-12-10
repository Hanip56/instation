import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import chattingService from "./chattingService";

const initialState = {
  conversations: [],
  messages: [],
  currentConv: {},
  isLoadingMsg: false,
  isErrorMsg: false,
  isSuccessMsg: false,
  messageMsg: "",
  isLoadingConv: false,
  isErrorConv: false,
  isSuccessConv: false,
  messageConv: "",
};

export const getConversation = createAsyncThunk(
  "/chat/getconversation",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await chattingService.getConversation(token);
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

export const addConversation = createAsyncThunk(
  "/chat/addconversation",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await chattingService.addConversation(data, token);
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

export const deleteConversation = createAsyncThunk(
  "/chat/deleteconversation",
  async (conversationId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await chattingService.deleteConversation(conversationId, token);
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

export const getMessages = createAsyncThunk(
  "/chat/getmessage",
  async (conversationId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await chattingService.getMessages(conversationId, token);
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
export const sendMessages = createAsyncThunk(
  "/chat/sendmessage",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.token;
      return await chattingService.sendMessages(data, token);
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

const chattingSlice = createSlice({
  name: "chatting",
  initialState,
  reducers: {
    addMessageSync: (state, action) => {
      if (state.messages.length > 0) {
        state.messages = [...state.messages, action.payload];
      }
    },
    setCurrentConv: (state, action) => {
      state.currentConv = action.payload;
    },
    resetMsg: (state) => {
      state.messages = [];
      state.isLoadingMsg = false;
      state.isErrorMsg = false;
      state.isSuccessMsg = false;
      state.messageMsg = "";
    },
    resetConv: (state) => {
      state.conversations = [];
      state.isLoadingConv = false;
      state.isErrorConv = false;
      state.isSuccessConv = false;
      state.messageConv = "";
    },
  },
  extraReducers: (Builder) => {
    Builder.addCase(getConversation.pending, (state) => {
      state.isLoadingConv = true;
    })
      .addCase(getConversation.fulfilled, (state, action) => {
        state.isLoadingConv = false;
        state.isSuccessConv = true;
        state.conversations = action.payload;
      })
      .addCase(getConversation.rejected, (state, action) => {
        state.isLoadingConv = false;
        state.isErrorConv = true;
        state.messageConv = action.payload;
      })
      .addCase(addConversation.fulfilled, (state, action) => {
        state.conversations.push({
          _id: action.payload._id,
          members: action.payload.members,
        });
      })
      .addCase(deleteConversation.fulfilled, (state, action) => {
        state.conversations = state.conversations.filter(
          (conv) => conv._id.toString() !== action.payload.toString()
        );
        state.currentConv = {};
        state.messages = [];
      })
      .addCase(getMessages.pending, (state) => {
        state.isLoadingMsg = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoadingMsg = false;
        state.isSuccessMsg = true;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoadingMsg = false;
        state.isErrorMsg = true;
        state.messageMsg = action.payload;
      })
      .addCase(sendMessages.pending, (state) => {
        state.isLoadingMsg = true;
      })
      .addCase(sendMessages.fulfilled, (state, action) => {
        state.isLoadingMsg = false;
        state.isSuccessMsg = true;
        state.messages.push(action.payload);
      })
      .addCase(sendMessages.rejected, (state, action) => {
        state.isLoadingMsg = false;
        state.isErrorMsg = true;
        state.messageMsg = action.payload;
      });
  },
});

export const { addMessageSync, setCurrentConv, resetMsg, resetConv } =
  chattingSlice.actions;

export default chattingSlice.reducer;
