import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  return (
    <Routes>
      <Route index path="/*" element={<Dashboard />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
