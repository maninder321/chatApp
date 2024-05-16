import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "../ProtectedRoutes";
import HomePage from "../../pages/HomePage";

function Dashboard() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route index path="/" element={<HomePage />} />
        <Route path="chats" element={<>Chats</>} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Route>
    </Routes>
  );
}

export default Dashboard;
