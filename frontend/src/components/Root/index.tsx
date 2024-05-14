import { Outlet, useNavigate } from "react-router-dom";
import useAppInitialize from "../../hooks/useAppInitialize";
import GlobalLoader from "../GlobalLoader";
import { useEffect } from "react";

function Root() {
  const { isInitializing, isAuthenticated } = useAppInitialize();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInitializing) {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }
  }, [isInitializing, isAuthenticated]);

  return (
    <>
      {isInitializing && <GlobalLoader />} {!isInitializing && <Outlet />}
    </>
  );
}

export default Root;
