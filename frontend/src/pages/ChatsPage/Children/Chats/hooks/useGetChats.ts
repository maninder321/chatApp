import { useCallback, useEffect, useRef, useState } from "react";
import getChats, {
  IGetChatsPayload,
  IGetChatsResponse,
} from "../../../../../services/chat/chatSidebar/getChats";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  addChats,
  resetChats,
} from "../../../../../redux/slices/chatSidebarSlice";

const useGetChats = () => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.chatSidebar.chatList);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  const handlePagination = useCallback((currentCount: number) => {
    if (currentCount < limit) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    setOffset((prev) => prev + currentCount);
  }, []);

  const fetchChats = useCallback(
    (inputStart: number | null = null, inputLimit: number | null = null) => {
      if (isLoading) {
        return;
      }
      let payload: IGetChatsPayload;
      console.log(inputStart, inputLimit);
      if (inputLimit && inputStart !== null) {
        payload = {
          start: inputStart,
          limit: inputLimit,
        };
      } else {
        payload = {
          start: offset,
          limit: limit,
        };
      }

      console.log(payload);
      setIsLoading(true);
      getChats(payload)
        .then((response) => {
          dispatch(addChats(response.chats));
          handlePagination(response.metaData.count);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [handlePagination, offset, isLoading]
  );

  return {
    isLoading,
    chats,
    fetchChats,
    hasMore,
  };
};

export default useGetChats;
