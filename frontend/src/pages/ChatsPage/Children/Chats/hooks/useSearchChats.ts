import { useCallback, useEffect, useRef, useState } from "react";
import searchChats, {
  ISearchChatsPayload,
  ISearchChatsResponse,
} from "../../../../../services/chat/chatSidebar/searchChats";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  addChats,
  resetChats,
} from "../../../../../redux/slices/chatSidebarSlice";

const useSearchChats = () => {
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

  const fetchSearchChats = useCallback(
    (
      searchText: string,
      inputStart: number | null = null,
      inputLimit: number | null = null
    ) => {
      if (isLoading) {
        return;
      }
      let payload: ISearchChatsPayload = {
        start: inputStart !== null ? inputStart : offset,
        limit: inputLimit ? inputLimit : limit,
        searchText: searchText,
      };
      setIsLoading(true);
      searchChats(payload)
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
    fetchSearchChats,
    hasMore,
  };
};

export default useSearchChats;
