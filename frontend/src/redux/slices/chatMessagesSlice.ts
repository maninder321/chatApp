import { createSlice } from "@reduxjs/toolkit";
import { IGetMessagesResponse } from "../../services/chat/chatMessages/getMessages";

interface IChatMessagesSlice {
  messageList: IGetMessagesResponse["messages"];
  activeChatUserDetails: IGetMessagesResponse["userDetails"] | null;
}

const initialState: IChatMessagesSlice = {
  messageList: [],
  activeChatUserDetails: null,
};

export const chatMessagesSlice = createSlice({
  name: "chatMessages",
  initialState,
  reducers: {
    setActiveChatDetails(state, action) {
      state.activeChatUserDetails = action.payload;
    },
    resetActiveChatDetails(state) {
      state.activeChatUserDetails = null;
    },
    updateActiveChatDetails(state, action) {
      if (
        state.activeChatUserDetails &&
        state.activeChatUserDetails.id == action.payload.id
      ) {
        state.activeChatUserDetails.isActive = action.payload.isActive;
      }
    },
    addMessages(state, action) {
      state.messageList = [...state.messageList, ...action.payload];
    },
    resetMessages(state) {
      state.messageList = [];
    },
    addMessagesToTop(state, action) {
      state.messageList = [action.payload, ...state.messageList];
    },
  },
});

export const {
  addMessages,
  resetMessages,
  addMessagesToTop,
  setActiveChatDetails,
  resetActiveChatDetails,
  updateActiveChatDetails,
} = chatMessagesSlice.actions;

export default chatMessagesSlice.reducer;
