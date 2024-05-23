import ChatDetails from "./Children/ChatDetails";
import Chats from "./Children/Chats";
import "./css/styles.css";

function ChatsPage() {
  return (
    <div className="chatsPageWrapper">
      <div className="leftSection">
        <Chats />
      </div>
      <div className="rightSection">
        <ChatDetails />
      </div>
    </div>
  );
}

export default ChatsPage;
