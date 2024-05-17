import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./css/styles.css";

function Login() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <div className="login-container">
      <div className="loginFormWrapper">
        <div className="headingSection">
          <div className="mainTitle">talkie-talk</div>
          <div className="subTitle">Sign in</div>
          <div className="caption">Let's connect with world</div>
        </div>
        <div className="loginForm">
          <div className="emailWrapper mb-4">
            <span className="mb-2">Email address</span>
            <input className="form-control" type="text" id="email" />
          </div>
          <div className="passwordWrapper">
            <span className="mb-2">Password</span>
            <input className="form-control" type="password" id="password" />
          </div>
          <button className="loginButton mt-4">Login</button>
          <div className="separator mt-5">
            <div className="line"></div>
            <div className="continueText">Or</div>
          </div>
          <div className="noAccount mt-4">
            Don't have talkie-talk account? <span>Sign up</span>
          </div>
          <div className="forgotPassword mt-2">
            Forgot Password? <span>Click Here</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
