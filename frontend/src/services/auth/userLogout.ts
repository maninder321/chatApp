import { axiosAuth } from "../../axios/http";

export interface IUserLogoutResponse {
  loggedOut: boolean;
}

async function userLogout() {
  let response = await axiosAuth.post("/api/user/logout");
  if (response.data.error) {
    throw Error(response.data.statusCode);
  }

  return response.data.data as IUserLogoutResponse;
}

export default userLogout;
