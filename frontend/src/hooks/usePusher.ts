import Pusher, { Channel } from "pusher-js";

import { useCallback, useEffect, useRef } from "react";
import getConfig from "../services/user/getConfig";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addMessagesToTop } from "../redux/slices/chatMessagesSlice";

const usePusher = () => {
  // const chatId = useAppSelector((state) => state.chatSidebar.selectedChat);
  const { chatId } = useParams();
  const dispatch = useAppDispatch();
  const pusherRef = useRef<Channel | null>(null);

  const newMessageHandler = useCallback((data: any, chatId: string) => {
    console.log(chatId);
    console.log(data.chatId);
    console.log(data.chatId == chatId);
    if (data.chatId == chatId) {
      console.log("adding message for chat id " + chatId);
      dispatch(
        addMessagesToTop({
          id: data.messageId,
          message: data.message,
          createdAtGmt: data.createdAtGmt,
          profileImgUrl: "",
          direction: data.direction,
        })
      );
    }
  }, []);

  const handleSubscription = useCallback(
    (chatId: string) => {
      if (pusherRef.current) {
        pusherRef.current.bind("new-chat", () => {
          console.log("new chat");
        });

        pusherRef.current.bind("new-message", (data: any) => {
          newMessageHandler(data, chatId);
        });
      }
      return () => {
        if (pusherRef.current) {
          pusherRef.current.unbind("new-message");
          pusherRef.current.unbind("new-chat");
        }
      };
    },
    [pusherRef.current]
  );

  useEffect(() => {
    if (chatId) {
      handleSubscription(chatId);
    }
  }, [chatId]);

  const setupPusher = useCallback(() => {
    getConfig()
      .then((response) => {
        const pusher = new Pusher(response.pusherKey, {
          cluster: response.pusherCluster,
        });

        const channel = pusher.subscribe(response.userPusherChannel);

        pusherRef.current = channel;
      })
      .catch();
  }, []);

  return {
    setupPusher,
  };
};

export default usePusher;
