import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./css/styles.css";
import { useState } from "react";

function ForgotPassword() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (isLoggedIn) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <div className="forgotPassword-container">
      <div className="forgotPasswordFormWrapper">
        <div className="headingSection">
          <div className="mainTitle">talkie-talk</div>
          <div className="subTitle">Forgot Password</div>
          <div className="caption">Let's connect with world</div>
        </div>
        <div className="forgotPasswordForm">
          <div className="emailWrapper mb-4">
            <span className="mb-2">Email address</span>
            <input className="form-control" type="text" id="email" />
          </div>
          <button
            className={`forgotPasswordButton mt-4 ${
              isSubmitted ? "buttonSuccess" : ""
            }`}
            onClick={() => {
              setIsSubmitted(true);
            }}
          >
            {isSubmitted && (
              <i
                className="fa-regular fa-circle-check fa-shake"
                style={{ fontSize: "20px" }}
              ></i>
            )}
            {isSubmitted ? "Email Sent" : "Send Email"}
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

export default ForgotPassword;
