import "./css/styles.css";

function Navbar() {
  return (
    <div className="navbarChat">
      <div className="profile mt-3">
        <img src="https://picsum.photos/id/237/200/300" />
        <div className="activeStatus online"></div>
      </div>
      <div className="navItems my-5">
        <div className="navItem">
          <i className="fa-solid fa-house-chimney"></i>
        </div>
        <div className="navItem">
          <i className="fa-solid fa-inbox"></i>
        </div>
        <div className="navItem">
          <i className="fa-solid fa-bell"></i>
        </div>
        <div className="navItem">
          <i className="fa-solid fa-gear"></i>
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
