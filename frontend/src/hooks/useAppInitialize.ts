import { useCallback, useEffect, useState } from "react";
import checkTokenValid from "../services/auth/checkTokenValid";
import useStoredAuth from "./useStoredAuth";
import { useAppDispatch } from "../redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";
import { canRedirectToHome } from "../utils/NavigationUtility";
import { setAxiosAuth } from "../axios/http";

const useAppInitialize = () => {
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const { getToken } = useStoredAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setAxiosAuth({ token: getToken() });
    handleCheckTokenValid();
  }, []);

  const handleCheckTokenValid = useCallback(() => {
    if (getToken().length === 0) {
      setIsInitializing(false);
      return;
    }
    checkTokenValid()
      .then((response) => {
        if (response.tokenValid) {
          dispatch(
            loginUser({
              isLoggedIn: true,
              token: getToken(),
              authData: {
                id: response.userData.id + "",
                name: response.userData.name,
                email: response.userData.email,
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
