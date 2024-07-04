import { useAppSelector } from "../redux/hooks";

const useAuth = () => {
  const { isLoggedIn, authData, token } = useAppSelector((state) => state.auth);
  return {
    isLoggedIn,
    authData,
    token,
  };
};

export default useAuth;
