import { useCallback, useEffect, useState } from "react";
import ChatMessage from "./Children/ChatMessage";
import "./css/styles.css";
import useGetMessages from "./hooks/useGetMessages";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { resetMessages } from "../../../../redux/slices/chatMessagesSlice";
import SpinnerLoader from "../../../../components/SpinnerLoader";
import useSendMessage from "./hooks/useSendMessage";
import InfiniteLoader from "../../../../components/InfiniteLoader";
import { NameInitialsAvatar } from "react-name-initials-avatar";

let controller: AbortController;

function ChatDetails() {
  const {
    isLoading,
    fetchMessages,
    hasMore,
    messages,
    resetPagination,
    isLoadingRef,
  } = useGetMessages();
  const { chatId } = useParams();
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string>("");

  const success = useCallback(() => {
    setMessage("");
  }, [setMessage]);

  const { isLoading: isSendMessageLoading, sendChatMessage } =
    useSendMessage(success);

  const activeChatUserDetails = useAppSelector(
    (state) => state.chatMessages.activeChatUserDetails
  );

  useEffect(() => {
    if (chatId) {
      console.log(chatId);
      console.log(controller);
      isLoadingRef.current = false;
      dispatch(resetMessages());
      resetPagination();
      controller = new AbortController();
      fetchMessages(+chatId, controller.signal);
    }
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [chatId]);

  return (
    <div className="chatDetailsWrapper">
      <div className="chatDetailsHeader">
        <div className="headerProfileImg">
          <div className="avatar">
            <NameInitialsAvatar
              name={
                activeChatUserDetails
                  ? activeChatUserDetails?.name.toUpperCase()
                  : "Default"
              }
              size="65px"
              bgColor={"#EBD4FD"}
              textColor={"#57039a"}
              borderColor={"#EBD4FD"}
              textSize="25px"
            />
          </div>
        </div>
        <div className="headerProfileDetails">
          <span className="username">{activeChatUserDetails?.name}</span>
          <span className="activityStatus">
            {activeChatUserDetails?.isActive ? "Online" : "Offline"}
          </span>
        </div>
        <div className="headerOptions">
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      </div>
      <div className="chatDetailsMain pt-3">
        {isLoading && messages.length == 0 && (
          <div className="chatDetailsLoader">
            <SpinnerLoader size="30px" color="#57039a" />
          </div>
        )}
        {messages.map((value, index) => (
          <ChatMessage
            key={value.id}
            direction={value.direction}
            messageText={value.message}
          />
        ))}
        {messages.length > 0 && (
          <div>
            <InfiniteLoader
              hasMore={hasMore}
              loadDataCallback={() => {
                console.log(chatId);
                if (chatId) {
                  fetchMessages(+chatId, controller.signal);
                }
              }}
            />
          </div>
        )}
      </div>
      <div className="chatDetailsFooter">
        <div className="messageInput">
          <input
            type="text"
            placeholder="Type Message Here"
            className="form-control"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <i className="fa-solid fa-paperclip"></i>
        </div>

        {isSendMessageLoading ? (
          <div className="sendChatMessageButtonLoader">
            <SpinnerLoader size="35px" color="#57039a" />
          </div>
        ) : (
          <div
            className="sendButton"
            onClick={() => {
              if (chatId) {
                sendChatMessage({ chatId: +chatId, message: message });
              }
            }}
          >
            <i className="fa-solid fa-circle-arrow-right"></i>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatDetails;
