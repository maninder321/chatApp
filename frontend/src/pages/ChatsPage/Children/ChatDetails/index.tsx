import { useCallback, useEffect, useState } from "react";
import ChatMessage from "./Children/ChatMessage";
import "./css/styles.css";
import useGetMessages from "./hooks/useGetMessages";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../redux/hooks";
import { resetMessages } from "../../../../redux/slices/chatMessagesSlice";
import SpinnerLoader from "../../../../components/SpinnerLoader";
import useSendMessage from "./hooks/useSendMessage";
import InfiniteLoader from "../../../../components/InfiniteLoader";
import { NameInitialsAvatar } from "react-name-initials-avatar";

let controller: AbortController;

function ChatDetails() {
  const { isLoading, fetchMessages, hasMore, messages, resetPagination } =
    useGetMessages();
  const { chatId } = useParams();
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string>("");

  const success = useCallback(() => {
    setMessage("");
  }, [setMessage]);

  const { isLoading: isSendMessageLoading, sendChatMessage } =
    useSendMessage(success);

  useEffect(() => {
    if (chatId) {
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
              name={"Hello Sing".toUpperCase()}
              size="65px"
              bgColor={"#EBD4FD"}
              textColor={"#57039a"}
              borderColor={"#EBD4FD"}
              textSize="25px"
            />
          </div>
        </div>
        <div className="headerProfileDetails">
          <span className="username">Maninder Singh</span>
          <span className="activityStatus">Online</span>
        </div>
        <div className="headerOptions">
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      </div>
      <div className="chatDetailsMain pt-3">
        {isLoading && (
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
        {
          <div className="mt-5">
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
        }
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
