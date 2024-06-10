import { axiosAuth } from "../../../axios/http";

export interface IGetChatsPayload {
  start: number;
  limit: number;
}

export interface ChatItem {
  id: number;
  name: string;
  lastMessage: string;
  profileImgUrl: string;
  unreadCount: number;
  timestamp: string;
}

export interface IGetChatsResponse {
  chats: ChatItem[];
  metaData: {
    count: number;
  };
}

async function getChats(payload: IGetChatsPayload) {
  let response = await axiosAuth.post("/api/chat/getChats", payload);
  if (response.data.error) {
    throw Error(response.data.statusCode);
  }

  let formattedResponse: any = {};

  formattedResponse.chats = response.data.data;
  formattedResponse.metaData = response.data.metaData;

  return formattedResponse as IGetChatsResponse;
}

export default getChats;
