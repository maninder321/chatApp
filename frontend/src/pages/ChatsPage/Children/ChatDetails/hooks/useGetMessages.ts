import { useCallback, useEffect, useRef, useState } from "react";
import getMessages, {
  IGetMessagesPayload,
  IGetMessagesResponse,
} from "../../../../../services/chat/chatMessages/getMessages";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  addMessages,
  resetMessages,
  setActiveChatDetails,
} from "../../../../../redux/slices/chatMessagesSlice";
import { CanceledError } from "axios";

const useGetMessages = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chatMessages.messageList);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isLoadingRef = useRef<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(20);
  const offsetRef = useRef<number>(0);

  const handlePagination = useCallback((currentCount: number) => {
    if (currentCount < limit) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    offsetRef.current += currentCount;
  }, []);

  const fetchMessages = useCallback(
    (chatId: number, signal: AbortSignal) => {
      if (isLoadingRef.current) {
        return;
      }

      let payload: IGetMessagesPayload = {
        chatId: chatId,
        start: offsetRef.current,
        limit: limit,
      };
      setIsLoading(true);
      isLoadingRef.current = true;
      getMessages(payload, signal)
        .then((response) => {
          dispatch(setActiveChatDetails(response.userDetails));
          dispatch(addMessages(response.messages));
          handlePagination(response.metaData.count);
          setIsLoading(false);
          isLoadingRef.current = false;
        })
        .catch((error) => {
          if (error instanceof CanceledError) {
            return;
          } else {
            setIsLoading(false);
            isLoadingRef.current = false;
          }
        });
    },
    [handlePagination, isLoading]
  );

  const resetPagination = useCallback(() => {
    offsetRef.current = 0;
  }, []);

  return {
    isLoading,
    messages,
    fetchMessages,
    hasMore,
    resetPagination,
    isLoadingRef,
  };
};

export default useGetMessages;
