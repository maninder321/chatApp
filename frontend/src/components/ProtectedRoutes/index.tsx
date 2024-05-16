import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function ProtectedRoutes() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} replace={true} />;
}

export default ProtectedRoutes;
