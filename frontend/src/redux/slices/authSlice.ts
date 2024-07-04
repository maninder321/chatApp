import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthData {
  id: string;
  name: string;
  email: string;
}

export interface IAuthState {
  isLoggedIn: boolean;
  token: string;
  authData: IAuthData | null;
}

const initialState: IAuthState = {
  isLoggedIn: false,
  token: "",
  authData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<IAuthState>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetUser(state) {
      return {
        ...state,
        ...initialState,
      };
    },
    updateToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { loginUser, resetUser, updateToken } = authSlice.actions;

export default authSlice.reducer;
