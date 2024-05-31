import SearchBar from "../../../../components/SearchBar";
import { useAppDispatch } from "../../../../redux/hooks";
import { toggleModal } from "../../../../redux/slices/createChatSlice";
import ChatItem from "./Children/ChatItem";
import "./css/styles.css";

function Chats() {
  const dispatch = useAppDispatch();

  return (
    <div className="chatsWrapper">
      <div className="title">
        <span>Chats</span>
        <div className="addIcon">
          <i
            className="fa-solid fa-circle-plus"
            onClick={() => {
              dispatch(toggleModal());
            }}
          ></i>
        </div>
      </div>
      <SearchBar />
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
