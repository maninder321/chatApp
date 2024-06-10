import { useEffect } from "react";
import ChatMessage from "./Children/ChatMessage";
import "./css/styles.css";
import useGetMessages from "./hooks/useGetMessages";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../redux/hooks";
import { resetMessages } from "../../../../redux/slices/chatMessagesSlice";
import SpinnerLoader from "../../../../components/SpinnerLoader";

let controller: AbortController;

function ChatDetails() {
  const { isLoading, fetchMessages, hasMore, messages, resetPagination } =
    useGetMessages();
  const { chatId } = useParams();
  const dispatch = useAppDispatch();

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
          <img src="https://picsum.photos/id/237/200/300" alt="" />
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
      </div>
      <div className="chatDetailsFooter">
        <div className="messageInput">
          <input
            type="text"
            placeholder="Type Message Here"
            className="form-control"
          />
          <i className="fa-solid fa-paperclip"></i>
        </div>
        <div className="sendButton">
          <i className="fa-solid fa-circle-arrow-right"></i>
        </div>
      </div>
    </div>
  );
}

export default ChatDetails;
