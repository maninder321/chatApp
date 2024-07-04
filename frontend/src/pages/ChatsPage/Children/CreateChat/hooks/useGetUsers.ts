import { useCallback, useEffect, useRef, useState } from "react";
import getUsers, {
  IGetUserPayload,
  IGetUserResponse,
} from "../../../../../services/chat/createChat/getUsers";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  addUsers,
  resetUsers,
} from "../../../../../redux/slices/createChatSlice";

const useGetUsers = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.createChat.userList);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const limitRef = useRef<number>(10);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    dispatch(resetUsers());
  }, []);

  const handlePagination = useCallback((currentCount: number) => {
    if (currentCount < limitRef.current) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    setOffset((prev) => prev + currentCount);
  }, []);

  const fetchUsers = useCallback(() => {
    if (isLoading) {
      return;
    }
    let payload: IGetUserPayload = {
      start: offset,
      limit: limitRef.current,
    };
    setIsLoading(true);
    getUsers(payload)
      .then((response) => {
        dispatch(addUsers(response.users));
        handlePagination(response.metaData.count);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [handlePagination, offset, isLoading]);

  return {
    isLoading,
    users,
    fetchUsers,
    hasMore,
  };
};

export default useGetUsers;
