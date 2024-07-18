import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Login from "./Children/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
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
      <Login />
    </>
  );
}

export default LoginPage;
