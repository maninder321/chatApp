import { useCallback, useEffect, useState } from "react";

function useAuthDetails() {
  const getAuthToken = useCallback(() => {
    return window.localStorage.getItem("chat_app_token") ?? "";
  }, []);

  const setAuthToken = useCallback((token: string) => {
    return window.localStorage.setItem("chat_app_token", token);
  }, []);

  return {
    getAuthToken,
    setAuthToken,
  };
}

export default useAuthDetails;
