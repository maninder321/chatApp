import { useNavigate } from "react-router-dom";
import "./css/styles.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbarChat">
      <div className="navWrapper">
        <div className="logo mt-3">
          {/* <i className="fa-solid fa-ring"></i> */}
          {/* <i className="fa-brands fa-rocketchat"></i> */}
        </div>
        <div className="profile mt-2">
          <img src="https://picsum.photos/id/237/200/300" />
          <div className="activeStatus online"></div>
        </div>
        <div className="navItems my-4">
          <div
            className="navItem"
            onClick={() => {
              navigate("/");
            }}
          >
            <i className="fa-solid fa-house-chimney"></i>
          </div>
          <div
            className="navItem"
            onClick={() => {
              navigate("/chats");
            }}
          >
            <i className="fa-solid fa-inbox"></i>
          </div>
          <div
            className="navItem"
            onClick={() => {
              navigate("/");
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
          </div>
        </div>
      </div>
      <div className="extraNavItems my-4">
        <div className="navItem">
          <i className="fa-solid fa-right-from-bracket"></i>
        </div>
      </div>
    </div>
  );
}

export default Navbar;