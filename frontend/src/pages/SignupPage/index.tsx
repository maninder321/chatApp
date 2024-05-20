import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Signup from "./Children/Signup";

function SignupPage() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={"/"} replace={true} />;
  }

  return <Signup />;
}

export default SignupPage;
