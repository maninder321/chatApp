import { useCallback, useEffect, useState } from "react";
import checkTokenValid from "../services/checkTokenValid";
import useAuthDetails from "./useAuthDetails";

function useAppInitialize() {
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { getAuthToken } = useAuthDetails();

  useEffect(() => {
    handlAppInitialze();
  });

  const handlAppInitialze = useCallback(() => {
    if (getAuthToken().length === 0) {
      setIsInitializing(false);
      setIsAuthenticated(false);
    } else {
      checkTokenValid()
        .then((data) => {
          data.tokenValid
            ? setIsAuthenticated(true)
            : setIsAuthenticated(false);
        })
        .catch((err) => {
          setIsAuthenticated(false);
        })
        .finally(() => {
          setIsInitializing(false);
        });
    }
  }, [getAuthToken]);

  return { isInitializing, isAuthenticated };
}

export default useAppInitialize;
