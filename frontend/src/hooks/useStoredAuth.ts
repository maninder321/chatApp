import { useCallback } from "react";

const useStoredAuth = () => {
  const getToken = useCallback((): string => {
    return window.localStorage.getItem("chat_app_token") ?? "";
  }, []);

  const setToken = useCallback((token: string) => {
    window.localStorage.setItem("chat_app_token", token);
  }, []);

  return {
    getToken,
    setToken,
  };
};
export default useStoredAuth;
