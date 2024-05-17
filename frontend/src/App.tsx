import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import ChatApp from "./components/ChatApp";
import useAppInitialize from "./hooks/useAppInitialize";
import GlobalLoader from "./components/GlobalLoader";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const { isInitializing } = useAppInitialize();

  if (isInitializing) {
    return <GlobalLoader />;
  }

  return (
    <Routes>
      <Route index path="/*" element={<ChatApp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
