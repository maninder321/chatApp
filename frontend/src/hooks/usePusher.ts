import Pusher, { Channel } from "pusher-js";

import { useCallback, useEffect, useRef } from "react";
import getConfig from "../services/user/getConfig";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addMessagesToTop } from "../redux/slices/chatMessagesSlice";
import {
  bindEvent,
  setPusher,
  subscribeChannel,
  unbindEvent,
  unsubscribeChannel,
} from "../pusher/pusher-setup";
import {
  addChatToTop,
  updateLastMessageDetails,
} from "../redux/slices/chatSidebarSlice";

const usePusher = () => {
  const { chatId } = useParams();
  const chatIdRef = useRef(chatId);
  const channelRef = useRef<Channel | null>(null);
  const dispatch = useAppDispatch();
  const channelNameRef = useRef<string>("");

  const newMessageHandler = useCallback((data: any) => {
    if (data.chatId == chatIdRef.current) {
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
    dispatch(
      updateLastMessageDetails({
        id: data.chatId,
        message: data.message,
        timestamp: data.createdAtGmt,
      })
    );
  }, []);

  const newChatHandler = useCallback((data: any) => {
    dispatch(
      addChatToTop({
        id: data.id,
        name: data.name,
        lastMessage: data.lastMessage,
        profileImgUrl: null,
        unreadCount: 0,
        timestamp: data.timestamp,
      })
    );
  }, []);

  useEffect(() => {
    console.log("setting pusher");
    setupPusher();
    return () => {
      console.log("clearing pusher");
      clearPusher();
    };
  }, []);

  useEffect(() => {
    if (chatId) {
      chatIdRef.current = chatId;
    }
  }, [chatId]);

  const setupPusher = useCallback(() => {
    getConfig()
      .then((response) => {
        setPusher(response.pusherKey, response.pusherCluster);
        channelNameRef.current = response.userPusherChannel;
        channelRef.current = subscribeChannel(response.userPusherChannel);
        if (channelRef.current) {
          bindEvent(channelRef.current, "new-message", newMessageHandler);
          bindEvent(channelRef.current, "new-chat", newChatHandler);
        }
      })
      .catch();
  }, []);

  const clearPusher = useCallback(() => {
    if (channelNameRef.current.length > 0 && channelRef.current) {
      unbindEvent(channelRef.current, "new-message");
      unbindEvent(channelRef.current, "new-chat");
      unsubscribeChannel(channelNameRef.current);
    }
  }, []);

  return {};
};

export default usePusher;
