import { createSlice } from "@reduxjs/toolkit";
import { IGetMessagesResponse } from "../../services/chat/chatMessages/getMessages";

interface IChatMessagesSlice {
  messageList: IGetMessagesResponse["messages"];
}

const initialState: IChatMessagesSlice = {
  messageList: [],
};

export const chatMessagesSlice = createSlice({
  name: "chatMessages",
  initialState,
  reducers: {
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

export const { addMessages, resetMessages, addMessagesToTop } =
  chatMessagesSlice.actions;

export default chatMessagesSlice.reducer;
