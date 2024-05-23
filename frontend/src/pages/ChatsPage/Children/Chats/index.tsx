import ChatItem from "./Children/ChatItem";
import "./css/styles.css";

function Chats() {
  return (
    <div className="chatsWrapper">
      <div className="title">
        <span>Chats</span>
        <div className="addIcon">
          <i className="fa-solid fa-circle-plus"></i>
        </div>
      </div>
      <div className="searchInput">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input className="form-control" placeholder="Search" type="text" />
      </div>
      <div className="chatsList">
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
      </div>
    </div>
  );
}

export default Chats;
