import { useNavigate } from "react-router-dom";
import "./css/styles.css";
import { useState } from "react";
import useUserSignup from "../../hooks/useUserSignup";
import SpinnerLoader from "../../../../components/SpinnerLoader";

function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const { isLoading, register } = useUserSignup();

  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <div className="signupFormWrapper">
        <div className="headingSection">
          <div className="mainTitle">talkie-talk</div>
          <div className="subTitle">Create account</div>
          <div className="caption">Let's connect with world</div>
        </div>
        <div className="signupForm">
          <div className="emailWrapper mb-4">
            <span className="mb-2">Email address</span>
            <input
              className="form-control"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="emailWrapper mb-4">
            <span className="mb-2">Username</span>
            <input
              className="form-control"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="passwordWrapper">
            <span className="mb-2">Password</span>
            <input
              className="form-control"
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            className="signupButton mt-4"
            onClick={() => {
              register({
                email: email,
                password: password,
                username: username,
              });
            }}
          >
            Sign up {isLoading && <SpinnerLoader size="20px" color="white" />}
          </button>
          <div className="separator">
            <div className="line"></div>
            <div className="continueText">Or</div>
          </div>
          <div className="noAccount mt-4">
            Already have talkie-talk account?{" "}
            <span
              onClick={() => {
                navigate("/login");
              }}
            >
              Log in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
