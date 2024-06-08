import { axiosAuth } from "../../../axios/http";

export interface IStartChatPayload {
  userId: number;
  message: string;
}

export interface IStartChatResponse {
  id: number;
}

async function startChat(payload: IStartChatPayload) {
  let response = await axiosAuth.post("/api/chat/start", payload);
  if (response.data.error) {
    throw Error(response.data.statusCode);
  }

  return response.data as IStartChatResponse;
}

export default startChat;
