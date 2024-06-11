import { NameInitialsAvatar } from "react-name-initials-avatar";
import "./css/styles.css";

function ChatMessage({
  direction,
  messageText,
}: {
  direction: "in" | "out";
  messageText: string;
}) {
  return (
    <div
      className={`messageTextWrapper ${
        direction === "in" ? "inWrapper" : "outWrapper"
      }`}
    >
      <div className="messageProfile">
        <div className="avatar">
          <NameInitialsAvatar
            name={"Hello Sing".toUpperCase()}
            size="40px"
            bgColor={"#EBD4FD"}
            textColor={"#57039a"}
            borderColor={"#EBD4FD"}
          />
        </div>
      </div>
      <div className={`messageText ${direction}`}>{messageText}</div>
    </div>
  );
}

export default ChatMessage;
