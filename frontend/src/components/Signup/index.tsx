import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./css/styles.css";

function Signup() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) {
    return <Navigate to={"/"} replace={true} />;
  }

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
            <input className="form-control" type="text" id="email" />
          </div>
          <div className="emailWrapper mb-4">
            <span className="mb-2">Username</span>
            <input className="form-control" type="text" id="username" />
          </div>
          <div className="passwordWrapper">
            <span className="mb-2">Password</span>
            <input className="form-control" type="password" id="password" />
          </div>
          <button className="signupButton mt-4">Signup</button>
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
