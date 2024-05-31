import "./css/styles.css";

function CreateChatForm() {
  return (
    <div className="createChatForm">
      <div className="createChatFormSearchDetails">
        <div className="userAvatar">
          <img src="https://picsum.photos/id/237/200/300" alt="" />
        </div>
        <div className="searchItemDetails">
          <div className="searchItemTitle">
            {"Maninder" + ` (${"maninder7463"})`}
          </div>
          <div className="searchItemMsg">{true ? "Online" : "Offline"}</div>
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
