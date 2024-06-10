import { defaultProfileImage } from "../../../../../../utils/ProfileUtility";
import "./css/styles.css";

function ChatItem({
  title,
  message,
  timestamp,
  unreadCount,
}: {
  title: string;
  message: string;
  timestamp: string;
  unreadCount: number;
}) {
  return (
    <div className="chatItemWrapper">
      <div className="userAvatar">
        <img src={defaultProfileImage()} alt="" />
      </div>
      <div className="chatItemDetails">
        <div className="chatItemTitle">{title}</div>
        <div className="chatItemMsg">{message}</div>
      </div>
      <div className="chatExtraDetails">
        <div className="chatTimestamp">{timestamp}</div>
        {unreadCount > 0 && (
          <div className="unreadCount">
            <span>{unreadCount}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatItem;
