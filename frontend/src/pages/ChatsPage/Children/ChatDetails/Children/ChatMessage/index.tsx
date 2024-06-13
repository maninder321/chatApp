import { NameInitialsAvatar } from "react-name-initials-avatar";
import "./css/styles.css";
import { useAppSelector } from "../../../../../../redux/hooks";

function ChatMessage({
  direction,
  messageText,
}: {
  direction: "in" | "out";
  messageText: string;
}) {
  const activeChatUserDetails = useAppSelector(
    (state) => state.chatMessages.activeChatUserDetails
  );
  const currentUserDetails = useAppSelector(
    (state) => state.global.currentUserDetails
  );

  return (
    <div
      className={`messageTextWrapper ${
        direction === "in" ? "inWrapper" : "outWrapper"
      }`}
    >
      <div className="messageProfile">
        <div className="avatar">
          <NameInitialsAvatar
            name={
              direction === "out"
                ? currentUserDetails
                  ? currentUserDetails.name.toUpperCase()
                  : "Default"
                : activeChatUserDetails
                ? activeChatUserDetails.name.toUpperCase()
                : "Default"
            }
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
