import { createSlice } from "@reduxjs/toolkit";

export interface IGlobalState {
  showNotification: boolean;
  currentUserDetails: {
    id: number;
    name: string;
  } | null;
}

const initialState: IGlobalState = {
  showNotification: false,
  currentUserDetails: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleShowNotification(state) {
      state.showNotification = !state.showNotification;
    },
    hideShowNotification(state) {
      state.showNotification = false;
    },
    setCurrentUser(state, action) {
      state.currentUserDetails = action.payload;
    },
    resetCurrentUser(state) {
      state.currentUserDetails = null;
    },
  },
});

export const {
  toggleShowNotification,
  hideShowNotification,
  setCurrentUser,
  resetCurrentUser,
} = globalSlice.actions;

export default globalSlice.reducer;
