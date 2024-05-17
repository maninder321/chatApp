import { useCallback, useEffect, useState } from "react";
import checkTokenValid from "../services/checkTokenValid";
import useStoredAuth from "./useStoredAuth";
import { useAppDispatch } from "../redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";
import { canRedirectToHome } from "../utils/NavigationUtility";

const useAppInitialize = () => {
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const { getToken } = useStoredAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    handleCheckTokenValid();
  }, []);

  const handleCheckTokenValid = useCallback(() => {
    if (getToken().length === 0) {
      setIsInitializing(false);
      return;
    }
    checkTokenValid(getToken())
      .then((response) => {
        if (response.tokenValid) {
          dispatch(
            loginUser({
              isLoggedIn: true,
              token: getToken(),
              authData: {
                id: response.userId + "",
                name: "",
                email: "",
              },
            })
          );
        } else {
          if (canRedirectToHome(location.pathname)) {
            navigate("/");
          } else {
            navigate(location.pathname);
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsInitializing(false);
      });
  }, [getToken]);

  return {
    isInitializing,
  };
};

export default useAppInitialize;
