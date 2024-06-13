import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import "./css/styles.css";
import { useAppDispatch } from "../../redux/hooks";
import {
  hideShowNotification,
  setCurrentUser,
  toggleShowNotification,
} from "../../redux/slices/globalSlice";
import usePusher from "../../hooks/usePusher";
import { useEffect } from "react";
import getCurrentUser from "../../services/user/getCurrentUser";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { setupPusher } = usePusher();

  useEffect(() => {
    // setupPusher();
    getCurrentUser()
      .then((response) => {
        dispatch(setCurrentUser(response));
      })
      .catch(() => {});
  }, []);

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
