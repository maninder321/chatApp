import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import ChatApp from "./components/ChatApp";

function App() {
  return (
    <Routes>
      <Route index path="/*" element={<ChatApp />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
