import { useCallback, useState } from "react";
import userRegister, {
  IUserRegisterPayload,
} from "../../../services/user/userRegister";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      if (email.length == 0 || password.length == 0 || username.length == 0) {
        toast.warn("Fields can't be empty");
        return;
      }
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
