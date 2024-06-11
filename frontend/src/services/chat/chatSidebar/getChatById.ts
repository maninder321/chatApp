import { axiosAuth } from "../../../axios/http";
import { ChatItem } from "./getChats";

export interface IGetChatByIdPayload {
  chatId: number;
}

export interface IGetChatByIdResponse extends ChatItem {}

async function getChatById(payload: IGetChatByIdPayload) {
  let response = await axiosAuth.post("/api/chat/getChatById", payload);
  if (response.data.error) {
    throw Error(response.data.statusCode);
  }

  return response.data.data as IGetChatByIdResponse;
}

export default getChatById;
