import { defaultProfileImage } from "../../../../../../utils/ProfileUtility";
import "./css/styles.css";

function ChatItem({
  title,
  message,
  timestamp,
  unreadCount,
  onChatClick,
  active,
}: {
  title: string;
  message: string;
  timestamp: string;
  unreadCount: number;
  onChatClick: Function;
  active: boolean;
}) {
  return (
    <div
      className={`chatItemWrapper ${active ? "activeChatItemWrapper" : ""}`}
      onClick={() => {
        onChatClick();
      }}
    >
      <div className="userAvatar">
        <img src={defaultProfileImage()} alt="" />
      </div>
      <div className="chatItemDetails">
        <div className="chatItemTitle">{title}</div>
        <div className={`chatItemMsg ${active ? "activeChatItemMsg" : ""}`}>
          {message}
        </div>
      </div>
      <div className="chatExtraDetails">
        <div className={`chatTimestamp ${active ? "activeChatTimestamp" : ""}`}>
          {timestamp}
        </div>
        {unreadCount > 0 && (
          <div className={`unreadCount ${active ? "activeUnreadCount" : ""}`}>
            <span>{unreadCount}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatItem;
