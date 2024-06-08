import { useAppSelector } from "../../../../../../redux/hooks";
import "./css/styles.css";

function CreateChatForm() {
  const user = useAppSelector((state) => state.createChat.selectedUser);

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
        />
        <div className="sendButton">
          <i className="fa-solid fa-circle-arrow-right"></i>
        </div>
      </div>
    </div>
  );
}

export default CreateChatForm;
