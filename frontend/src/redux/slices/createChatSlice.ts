import { createSlice } from "@reduxjs/toolkit";
import { IGetUserResponse } from "../../services/chat/createChat/getUsers";

interface ICreateChatSlice {
  showCreateChatModal: boolean;
  userList: IGetUserResponse["users"];
  selectedUser: IGetUserResponse["users"][0] | null;
}

const initialState: ICreateChatSlice = {
  showCreateChatModal: false,
  userList: [],
  selectedUser: null,
};

export const createChatSlice = createSlice({
  name: "createChat",
  initialState,
  reducers: {
    toggleModal(state) {
      state.showCreateChatModal = !state.showCreateChatModal;
    },
    addUsers(state, action) {
      state.userList = [...state.userList, ...action.payload];
    },
    resetUsers(state) {
      state.userList = [];
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
    resetSelectedUser(state) {
      state.selectedUser = null;
    },
  },
});

export const {
  toggleModal,
  addUsers,
  resetUsers,
  setSelectedUser,
  resetSelectedUser,
} = createChatSlice.actions;

export default createChatSlice.reducer;
