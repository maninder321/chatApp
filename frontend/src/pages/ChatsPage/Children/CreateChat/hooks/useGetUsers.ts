import { useCallback, useRef, useState } from "react";
import getUsers, {
  IGetUserPayload,
  IGetUserResponse,
} from "../../../../../services/chat/createChat/getUsers";

const useGetUsers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isLoadingRef = useRef(isLoading);
  const [users, setUsers] = useState<IGetUserResponse["users"]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const offsetRef = useRef<number>(0);
  const limitRef = useRef<number>(10);

  const handlePagination = useCallback((currentCount: number) => {
    if (currentCount < limitRef.current) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    offsetRef.current += currentCount;
  }, []);

  const fetchUsers = useCallback(() => {
    if (isLoadingRef.current) {
      return;
    }
    let payload: IGetUserPayload = {
      start: offsetRef.current,
      limit: limitRef.current,
    };
    setIsLoading(true);
    isLoadingRef.current = true;
    getUsers(payload)
      .then((response) => {
        setUsers((prev) => [...prev, ...response.users]);
        handlePagination(response.metaData.count);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        isLoadingRef.current = false;
      });
  }, [handlePagination]);

  return {
    isLoading,
    users,
    fetchUsers,
    hasMore,
  };
};

export default useGetUsers;
