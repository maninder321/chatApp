import { axiosAuth } from "../../axios/http";

export interface IGetCurrentUserResponse {
  id: number;
  name: string;
}

async function getCurrentUser() {
  let response = await axiosAuth.post("/api/user/getCurrentUser");
  if (response.data.error) {
    throw Error(response.data.statusCode);
  }

  return response.data.data as IGetCurrentUserResponse;
}

export default getCurrentUser;
