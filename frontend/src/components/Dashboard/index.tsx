import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div>Navbar</div>
      <Outlet />
    </>
  );
};

export default Dashboard;
