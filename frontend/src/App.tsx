import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import ChatApp from "./components/ChatApp";
import useAppInitialize from "./hooks/useAppInitialize";
import GlobalLoader from "./components/GlobalLoader";

function App() {
  const { isInitializing } = useAppInitialize();

  if (isInitializing) {
    return <GlobalLoader />;
  }

  return (
    <Routes>
      <Route index path="/*" element={<ChatApp />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
