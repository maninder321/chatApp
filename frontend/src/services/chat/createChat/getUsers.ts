import { axiosAuth } from "../../../axios/http";

export interface IGetUserPayload {
  start: number;
  limit: number;
}

interface User {
  id: number;
  name: string;
  userName: string;
  isActive: boolean;
}

export interface IGetUserResponse {
  users: User[];
  metaData: {
    count: number;
  };
}

async function getUsers(payload: IGetUserPayload) {
  let response = await axiosAuth.post("/api/chat/getUsers", payload);
  if (response.data.error) {
    throw Error(response.data.statusCode);
  }

  let formattedResponse: any = {};

  formattedResponse.users = response.data.data;
  formattedResponse.metaData = response.data.metaData;

  return formattedResponse as IGetUserResponse;
}

export default getUsers;
