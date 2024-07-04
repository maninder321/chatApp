import { axiosAuth } from "../../axios/http";

export interface IUserLoginPayload {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

async function userLogin(payload: IUserLoginPayload) {
  let response = await axiosAuth.post("/api/user/login", payload);
  if (response.data.error) {
    throw Error(response.data.statusCode);
  }

  return response.data.data as IUserLoginResponse;
}

export default userLogin;
