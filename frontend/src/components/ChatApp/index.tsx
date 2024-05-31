import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "../ProtectedRoutes";
import HomePage from "../../pages/HomePage";
import ChatsPage from "../../pages/ChatsPage";
import SettingsPage from "../../pages/SettingsPage";

function ChatApp() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route index path="/" element={<ChatsPage />} />
        {/* <Route path="chats" element={<ChatsPage />} /> */}
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Route>
    </Routes>
  );
}

export default ChatApp;
