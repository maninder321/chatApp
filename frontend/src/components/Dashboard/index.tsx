import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "home",
    element: <>Home</>,
  },
  {
    path: "chats",
    element: <>Chats</>,
  },
]);

function Dashboard() {
  return <RouterProvider router={router} />;
}

export default Dashboard;
