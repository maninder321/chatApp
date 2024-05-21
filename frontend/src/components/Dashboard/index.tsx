import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import "./css/styles.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="nav">
        <Navbar />
      </div>
      <div className="mainSection">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
