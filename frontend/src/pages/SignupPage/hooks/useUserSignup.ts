import { useCallback, useState } from "react";
import userRegister, {
  IUserRegisterPayload,
} from "../../../services/user/userRegister";
import { useNavigate } from "react-router-dom";

const useUserSignup = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const register = useCallback(
    ({
      email,
      password,
      username,
    }: {
      email: string;
      password: string;
      username: string;
    }) => {
      setIsLoading(true);
      let payload: IUserRegisterPayload = {
        email: email,
        password: password,
        userName: username,
        name: username,
      };
      userRegister(payload)
        .then((response) => {
          navigate("/login");
        })
        .catch(() => {
          console.log("error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    []
  );

  return {
    isLoading,
    register,
  };
};

export default useUserSignup;
