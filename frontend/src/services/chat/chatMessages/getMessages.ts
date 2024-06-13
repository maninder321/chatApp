import { axiosAuth } from "../../../axios/http";

export interface IGetMessagesPayload {
  chatId: number;
  start: number;
  limit: number;
}

export interface MessageItem {
  id: number;
  message: string;
  createdAtGmt: string;
  profileImgUrl: string;
  direction: "in" | "out";
}

export interface IGetMessagesResponse {
  userDetails: {
    id: number;
    name: string;
    isActive: boolean;
  };
  messages: MessageItem[];
  metaData: {
    count: number;
  };
}

async function getMessages(payload: IGetMessagesPayload, signal: AbortSignal) {
  let response = await axiosAuth.post("/api/chat/getMessages", payload, {
    signal: signal,
  });
  if (response.data.error) {
    throw Error(response.data.statusCode);
  }

  let formattedResponse: any = {};

  formattedResponse.messages = response.data.data.messages;
  formattedResponse.userDetails = response.data.data.userDetails;
  formattedResponse.metaData = response.data.metaData;

  return formattedResponse as IGetMessagesResponse;
}

export default getMessages;
