import { useNavigate } from "react-router-dom";
import "./css/styles.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleShowNotification } from "../../redux/slices/globalSlice";
import { NameInitialsAvatar } from "react-name-initials-avatar";
import useUserLogout from "./hooks/useUserLogout";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, logout } = useUserLogout();
  const currentUserDetails = useAppSelector(
    (state) => state.global.currentUserDetails
  );

  return (
    <>
      <div className="navbarChat">
        <div className="navWrapper">
          <div className="logo mt-3">
            {/* <i className="fa-solid fa-ring"></i> */}
            {/* <i className="fa-brands fa-rocketchat"></i> */}
          </div>
          <div className="profile mt-2">
            <div className="avatar">
              <NameInitialsAvatar
                name={
                  currentUserDetails
                    ? currentUserDetails.name.toUpperCase()
                    : "Default"
                }
                size="55px"
                bgColor={"#EBD4FD"}
                textColor={"#57039a"}
                borderColor={"#EBD4FD"}
                textSize="25px"
              />
            </div>
            <div className="activeStatus online"></div>
          </div>
          <div className="navItems my-4">
            {/* <div
            className="navItem"
            onClick={() => {
              navigate("/");
            }}
          >
            <i className="fa-solid fa-house-chimney"></i>
          </div> */}
            <div
              className="navItem"
              onClick={() => {
                navigate("/");
              }}
            >
              <i className="fa-solid fa-house-chimney"></i>
              {/* <i className="fa-solid fa-inbox"></i> */}
            </div>
            {/* <div
              className="navItem"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(toggleShowNotification());
              }}
            >
              <i className="fa-solid fa-bell"></i>
            </div>
            <div
              className="navItem"
              onClick={() => {
                navigate("/settings");
              }}
            >
              <i className="fa-solid fa-gear"></i>
            </div> */}
          </div>
        </div>
        <div className="extraNavItems my-4">
          <div
            className="navItem"
            onClick={() => {
              logout();
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
