import { axiosAuth } from "../../axios/http";

export interface IGetConfigResponse {
  userPusherChannel: string;
  pusherKey: string;
  pusherCluster: string;
}

async function getConfig() {
  let response = await axiosAuth.post("/api/user/getConfig");
  if (response.data.error) {
    throw Error(response.data.statusCode);
  }

  return response.data.data as IGetConfigResponse;
}

export default getConfig;
