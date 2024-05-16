import { useCallback, useEffect, useState } from "react";
import checkTokenValid from "../services/checkTokenValid";
import useStoredAuth from "./useStoredAuth";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";

const useAppInitialize = () => {
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const { getToken } = useStoredAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    handleCheckTokenValid();
  }, []);

  const handleCheckTokenValid = useCallback(() => {
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
          navigate("/");
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
