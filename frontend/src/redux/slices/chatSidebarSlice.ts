import { createSlice } from "@reduxjs/toolkit";
import {
  ChatItem,
  IGetChatsResponse,
} from "../../services/chat/chatSidebar/getChats";

interface IChatSidebarSlice {
  chatList: IGetChatsResponse["chats"];
  selectedChat: IGetChatsResponse["chats"][0] | null;
}

const initialState: IChatSidebarSlice = {
  chatList: [],
  selectedChat: null,
};

export const chatSidebarSlice = createSlice({
  name: "chatSidebar",
  initialState,
  reducers: {
    addChats(state, action) {
      let chatList = [...state.chatList, ...action.payload];
      chatList.sort((a: ChatItem, b: ChatItem) => {
        return Date.parse(b.timestamp) - Date.parse(a.timestamp);
      });
      state.chatList = chatList;
    },
    addChatToTop(state, action) {
      state.chatList = [action.payload, ...state.chatList];
    },
    resetChats(state) {
      state.chatList = [];
    },
    setSelectedChat(state, action) {
      state.selectedChat = action.payload;
    },
    resetSelectedChat(state) {
      state.selectedChat = null;
    },
    updateChatMessageDetails(state, action) {
      let chatList: ChatItem[] = [];

      chatList = state.chatList.map((value, index) => {
        if (value.id == action.payload.id) {
          return action.payload;
        }
        return value;
      });

      chatList.sort((a: ChatItem, b: ChatItem) => {
        return Date.parse(b.timestamp) - Date.parse(a.timestamp);
      });
      state.chatList = chatList;
    },
    updateLastMessageDetails(state, action) {
      let chatList: ChatItem[] = [];

      chatList = state.chatList.map((value, index) => {
        console.log("hi");
        console.log(action);
        if (value.id == action.payload.id) {
          value.lastMessage = action.payload.message;
          value.timestamp = action.payload.timestamp;
        }
        return value;
      });

      chatList.sort((a: ChatItem, b: ChatItem) => {
        return Date.parse(b.timestamp) - Date.parse(a.timestamp);
      });
      state.chatList = chatList;
    },
  },
});

export const {
  addChats,
  resetChats,
  setSelectedChat,
  resetSelectedChat,
  updateChatMessageDetails,
  updateLastMessageDetails,
  addChatToTop,
} = chatSidebarSlice.actions;

export default chatSidebarSlice.reducer;
