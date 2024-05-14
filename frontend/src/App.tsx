import { RouterProvider } from "react-router-dom";
import router from "./routes/mainRoutes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
