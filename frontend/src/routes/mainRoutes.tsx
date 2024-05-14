import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root";
import Dashboard from "../components/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <>Login</>,
      },
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
