import { useCallback, useState } from "react";
import userLogout from "../../../services/auth/userLogout";
import { useNavigate } from "react-router-dom";
import useStoredAuth from "../../../hooks/useStoredAuth";

const useUserLogout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { clearToken } = useStoredAuth();

  const logout = useCallback(() => {
    setIsLoading(true);
    userLogout()
      .then((response) => {
        setIsLoading(false);
        if (response.loggedOut) {
          clearToken();
          window.location.href = "/login";
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    isLoading,
    logout,
  };
};

export default useUserLogout;
