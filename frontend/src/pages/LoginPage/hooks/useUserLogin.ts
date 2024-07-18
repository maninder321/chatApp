import { useCallback, useState } from "react";
import userLogin, { IUserLoginPayload } from "../../../services/auth/userLogin";
import useStoredAuth from "../../../hooks/useStoredAuth";
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useUserLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setToken } = useStoredAuth();
  const navigate = useNavigate();

  const login = useCallback(
    (email: string, password: string) => {
      if (email.length == 0 || password.length == 0) {
        toast.warn("Fields can't be empty");
        return;
      }
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
          toast.error("Failed to Login");
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
