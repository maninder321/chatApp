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
        <img src="https://picsum.photos/id/237/200/300"></img>
      </div>
      <div className={`messageText ${direction}`}>{messageText}</div>
    </div>
  );
}

export default ChatMessage;
