import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthData {
  name: string;
  email: string;
}

export interface IAuthState {
  isLoggedIn: boolean;
  token: string;
  authData: IAuthData | null;
}

const initialState: IAuthState = {
  isLoggedIn: true,
  token: "",
  authData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<IAuthState>) {
      state = action.payload;
    },
    resetUser(state) {
      state = initialState;
    },
    updateToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { loginUser, resetUser, updateToken } = authSlice.actions;

export default authSlice.reducer;
