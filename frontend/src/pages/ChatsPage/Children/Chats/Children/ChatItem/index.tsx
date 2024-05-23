import "./css/styles.css";

function ChatItem() {
  return (
    <div className="chatItemWrapper">
      <div className="userAvatar">
        <img src="https://picsum.photos/id/237/200/300" alt="" />
      </div>
      <div className="chatItemDetails">
        <div className="chatItemTitle">Maninder</div>
        <div className="chatItemMsg">
          Hi, whatsapp? What are you doing? hello how are you what are you doing
        </div>
      </div>
      <div className="chatExtraDetails">
        <div className="chatTimestamp">10:29</div>
        <div className="unreadCount">
          <span>3</span>
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
