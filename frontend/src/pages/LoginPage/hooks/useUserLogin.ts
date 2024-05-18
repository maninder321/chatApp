import { useCallback, useState } from "react";
import userLogin, { IUserLoginPayload } from "../../../services/auth/userLogin";
import useStoredAuth from "../../../hooks/useStoredAuth";
import { redirect, useNavigate } from "react-router-dom";

const useUserLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setToken } = useStoredAuth();
  const navigate = useNavigate();

  const login = useCallback(
    (email: string, password: string) => {
      let payload: IUserLoginPayload = {
        email: email,
        password: password,
      };
      setIsLoading(true);
      userLogin(payload)
        .then((response) => {
          setToken(response.access_token);
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [setToken]
  );

  return {
    isLoading,
    login,
  };
};

export default useUserLogin;
