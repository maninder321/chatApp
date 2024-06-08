import { useCallback, useEffect, useRef, useState } from "react";
import startChat, {
  IStartChatPayload,
  IStartChatResponse,
} from "../../../../../services/chat/createChat/startChat";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";

const useStartChat = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        .then((response) => {})
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
