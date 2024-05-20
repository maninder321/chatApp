import axios from "axios";
import { axiosAuth } from "../../axios/http";

export interface IUserRegisterPayload {
  name: string;
  email: string;
  password: string;
  userName: string;
}

export interface IUserRegisterResponse {
  id: number;
}

async function userRegister(payload: IUserRegisterPayload) {
  let response = await axiosAuth.post("/api/user/register", payload);
  if (response.data.error) {
    throw Error(response.data.statusCode);
  }

  return response.data.data as IUserRegisterResponse;
}

export default userRegister;
