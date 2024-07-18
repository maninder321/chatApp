import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "../ProtectedRoutes";
import HomePage from "../../pages/HomePage";
import ChatsPage from "../../pages/ChatsPage";
import SettingsPage from "../../pages/SettingsPage";
import { useAppSelector } from "../../redux/hooks";
import Notification from "../Notification";
import { ToastContainer } from "react-toastify";

function ChatApp() {
  const showNotification = useAppSelector(
    (state) => state.global.showNotification
  );
  return (
    <>
      {showNotification && <Notification />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route index path="/" element={<ChatsPage />} />
          <Route index path="/:chatId" element={<ChatsPage />} />
          {/* <Route path="chats" element={<ChatsPage />} /> */}
          <Route path="settings/*" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Route>
      </Routes>
    </>
  );
}

export default ChatApp;
