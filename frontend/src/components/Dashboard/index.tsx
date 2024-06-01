import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import "./css/styles.css";
import { useAppDispatch } from "../../redux/hooks";
import {
  hideShowNotification,
  toggleShowNotification,
} from "../../redux/slices/globalSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => {
        dispatch(hideShowNotification());
      }}
      className="dashboard"
    >
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
