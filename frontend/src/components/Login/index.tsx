import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Login() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={"/"} replace={true} />;
  }

  return <div>Login</div>;
}

export default Login;
