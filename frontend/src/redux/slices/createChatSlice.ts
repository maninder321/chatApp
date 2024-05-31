import { createSlice } from "@reduxjs/toolkit";

interface ICreateChatSlice {
  showCreateChatModal: boolean;
}

const initialState: ICreateChatSlice = {
  showCreateChatModal: false,
};

export const createChatSlice = createSlice({
  name: "createChat",
  initialState,
  reducers: {
    toggleModal(state) {
      state.showCreateChatModal = !state.showCreateChatModal;
    },
  },
});

export const { toggleModal } = createChatSlice.actions;

export default createChatSlice.reducer;
