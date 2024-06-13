import { useCallback } from "react";

const useStoredAuth = () => {
  const getToken = useCallback((): string => {
    return window.localStorage.getItem("chat_app_token") ?? "";
  }, []);

  const setToken = useCallback((token: string) => {
    window.localStorage.setItem("chat_app_token", token);
  }, []);

  const clearToken = useCallback(() => {
    window.localStorage.removeItem("chat_app_token");
  }, []);

  return {
    getToken,
    setToken,
    clearToken,
  };
};
export default useStoredAuth;
