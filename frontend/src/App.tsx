import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatApp from "./components/ChatApp";
import useAppInitialize from "./hooks/useAppInitialize";
import GlobalLoader from "./components/GlobalLoader";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function App() {
  const { isInitializing } = useAppInitialize();

  if (isInitializing) {
    return <GlobalLoader />;
  }

  return (
    <Routes>
      <Route index path="/*" element={<ChatApp />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
    </Routes>
  );
}

export default App;
