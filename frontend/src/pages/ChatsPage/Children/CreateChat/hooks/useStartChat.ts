import { useCallback, useEffect, useRef, useState } from "react";
import startChat, {
  IStartChatPayload,
  IStartChatResponse,
} from "../../../../../services/chat/createChat/startChat";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import useGetChatById from "../../Chats/hooks/useGetChatById";
import { useNavigate } from "react-router-dom";
import { resetChats } from "../../../../../redux/slices/chatSidebarSlice";
import useGetChats from "../../Chats/hooks/useGetChats";

const useStartChat = () => {
  const dispatch = useAppDispatch();
  const { fetchChatById } = useGetChatById();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fetchChats } = useGetChats();
  const navigate = useNavigate();

  const createChat = useCallback(
    (userId: number, message: string) => {
      if (isLoading) {
        return;
      }

      if (message.length == 0) {
        return;
      }

      let payload: IStartChatPayload = {
        userId: userId,
        message: message,
      };
      setIsLoading(true);
      startChat(payload)
        .then((response) => {
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [isLoading]
  );

  return {
    isLoading,
    createChat,
  };
};

export default useStartChat;
