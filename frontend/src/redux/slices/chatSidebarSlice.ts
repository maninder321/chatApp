import { createSlice } from "@reduxjs/toolkit";
import { IGetChatsResponse } from "../../services/chat/chatSidebar/getChats";

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
      state.chatList = [...state.chatList, ...action.payload];
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
      let chatList = state.chatList.map((value, index) => {
        if (value.id == action.payload.id) {
          return action.payload;
        }
        return value;
      });
    },
  },
});

export const { addChats, resetChats, setSelectedChat, resetSelectedChat } =
  chatSidebarSlice.actions;

export default chatSidebarSlice.reducer;
