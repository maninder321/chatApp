import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Signup from "./Children/Signup";
import { ToastContainer } from "react-toastify";

function SignupPage() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Signup />
    </>
  );
}

export default SignupPage;
