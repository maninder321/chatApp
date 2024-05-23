import "./css/styles.css";

function ChatMessage({
  direction,
  messageText,
}: {
  direction: "in" | "out";
  messageText: string;
}) {
  return (
    <div className={`messageTextWrapper ${direction}`}>
      <div className="messageText">{messageText}</div>
    </div>
  );
}

export default ChatMessage;
