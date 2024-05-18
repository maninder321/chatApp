import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Login from "./Children/Login";

function LoginPage() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={"/"} replace={true} />;
  }

  return <Login />;
}

export default LoginPage;
