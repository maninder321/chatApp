import { useCallback, useState } from "react";
import sendMessage, {
  ISendMessagePayload,
} from "../../../../../services/chat/chatMessages/sendMessage";
import { useAppDispatch } from "../../../../../redux/hooks";
import { addMessagesToTop } from "../../../../../redux/slices/chatMessagesSlice";

const useSendMessage = (successCallback?: Function) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendChatMessage = useCallback(
    (payload: { chatId: number; message: string }) => {
      let sendChatPayload: ISendMessagePayload = {
        chatId: payload.chatId,
        message: payload.message,
      };
      setIsLoading(true);
      sendMessage(sendChatPayload)
        .then((response) => {
          if (successCallback) {
            successCallback();
          }
          dispatch(addMessagesToTop(response));
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    },
    []
  );

  return {
    isLoading,
    sendChatMessage,
  };
};

export default useSendMessage;