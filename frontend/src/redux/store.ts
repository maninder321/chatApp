import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import createChatReducer from "./slices/createChatSlice";
import globalReducer from "./slices/globalSlice";
import chatSidebarReducer from "./slices/chatSidebarSlice";
import chatMessagesReducer from "./slices/chatMessagesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    createChat: createChatReducer,
    global: globalReducer,
    chatSidebar: chatSidebarReducer,
    chatMessages: chatMessagesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
