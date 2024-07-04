import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Dashboard from "../Dashboard";

function ProtectedRoutes() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Dashboard /> : <Navigate to={"/login"} replace={true} />;
}

export default ProtectedRoutes;
