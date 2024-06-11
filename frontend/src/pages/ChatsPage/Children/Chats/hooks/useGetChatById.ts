import { useCallback, useState } from "react";
import getChatById, {
  IGetChatByIdPayload,
} from "../../../../../services/chat/chatSidebar/getChatById";
import { useAppDispatch } from "../../../../../redux/hooks";
import { updateChatMessageDetails } from "../../../../../redux/slices/chatSidebarSlice";

const useGetChatById = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchChatById = useCallback((chatId: number) => {
    let payload: IGetChatByIdPayload = {
      chatId: chatId,
    };
    setIsLoading(true);
    getChatById(payload)
      .then((response) => {
        dispatch(updateChatMessageDetails(response));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    isLoading,
    fetchChatById,
  };
};

export default useGetChatById;
