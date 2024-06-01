import { createSlice } from "@reduxjs/toolkit";

export interface IGlobalState {
  showNotification: boolean;
}

const initialState: IGlobalState = {
  showNotification: false,
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
  },
});

export const { toggleShowNotification, hideShowNotification } =
  globalSlice.actions;

export default globalSlice.reducer;
