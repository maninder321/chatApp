import { useState } from "react";
import { useAppSelector } from "../../../../../../redux/hooks";
import useStartChat from "../../hooks/useStartChat";
import "./css/styles.css";
import SpinnerLoader from "../../../../../../components/SpinnerLoader";

function CreateChatForm() {
  const user = useAppSelector((state) => state.createChat.selectedUser);
  const { isLoading, createChat } = useStartChat();
  const [message, setMessage] = useState<string>("");

  return (
    <div className="createChatForm">
      <div className="createChatFormSearchDetails">
        <div className="userAvatar">
          <img src="https://picsum.photos/id/237/200/300" alt="" />
        </div>
        <div className="searchItemDetails">
          <div className="searchItemTitle">
            {user?.name + ` (${user?.userName})`}
          </div>
          <div className="searchItemMsg">
            {user?.isActive ? "Online" : "Offline"}
          </div>
        </div>
      </div>
      <div className="createChatMainForm">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        {isLoading ? (
          <div className="sendButtonLoader">
            <SpinnerLoader size="35px" color="#57039a" />
          </div>
        ) : (
          <div
            className="sendButton"
            onClick={() => {
              if (user) {
                createChat(user.id, message);
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

export default CreateChatForm;
