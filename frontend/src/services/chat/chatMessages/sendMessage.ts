import { axiosAuth } from "../../../axios/http";
import { MessageItem } from "./getMessages";

export interface ISendMessagePayload {
  chatId: number;
  message: string;
}

export interface ISendMessageResponse extends MessageItem {}

async function sendMessage(payload: ISendMessagePayload) {
  let response = await axiosAuth.post("/api/chat/sendMessage", payload);
  if (response.data.error) {
    throw Error(response.data.statusCode);
  }

  return response.data.data as ISendMessageResponse;
}

export default sendMessage;
