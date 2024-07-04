import { useNavigate } from "react-router-dom";
import useUserLogin from "../../hooks/useUserLogin";
import SpinnerLoader from "../../../../components/SpinnerLoader";
import "./css/styles.css";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigtate = useNavigate();
  const { isLoading, login } = useUserLogin();

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
            <input
              className="form-control"
              type="text"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="passwordWrapper">
            <span className="mb-2">Password</span>
            <input
              className="form-control"
              type="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            className="loginButton mt-4"
            onClick={() => {
              login(email, password);
            }}
          >
            Login {isLoading && <SpinnerLoader size="20px" color="white" />}
          </button>
          <div className="separator mt-5">
            <div className="line"></div>
            <div className="continueText">Or</div>
          </div>
          <div className="noAccount mt-4">
            Don't have talkie-talk account?{" "}
            <span
              onClick={() => {
                navigtate("/signup");
              }}
            >
              Sign up
            </span>
          </div>
          <div className="forgotPassword mt-2">
            Forgot Password?{" "}
            <span
              onClick={() => {
                navigtate("/forgotPassword");
              }}
            >
              Click Here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
