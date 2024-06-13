import { axiosAuth } from "../../../axios/http";
import { ChatItem } from "./getChats";

export interface ISearchChatsPayload {
  start: number;
  limit: number;
  searchText: string;
}

export interface ISearchChatsResponse {
  chats: ChatItem[];
  metaData: {
    count: number;
  };
}

async function searchChats(payload: ISearchChatsPayload) {
  let response = await axiosAuth.post("/api/chat/searchChats", payload);
  if (response.data.error) {
    throw Error(response.data.statusCode);
  }

  let formattedResponse: any = {};

  formattedResponse.chats = response.data.data;
  formattedResponse.metaData = response.data.metaData;

  return formattedResponse as ISearchChatsResponse;
}

export default searchChats;
