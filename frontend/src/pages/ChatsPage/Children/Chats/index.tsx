import { useEffect } from "react";
import SearchBar from "../../../../components/SearchBar";
import { useAppDispatch } from "../../../../redux/hooks";
import { toggleModal } from "../../../../redux/slices/createChatSlice";
import ChatItem from "./Children/ChatItem";
import "./css/styles.css";
import useGetChats from "./hooks/useGetChats";
import InfiniteLoader from "../../../../components/InfiniteLoader";

function Chats() {
  const dispatch = useAppDispatch();
  const { isLoading, chats, fetchChats, hasMore } = useGetChats();

  useEffect(() => {
    fetchChats();
  }, []);

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
        {chats.map((value, index) => {
          return <ChatItem />;
        })}
        {
          <InfiniteLoader
            hasMore={hasMore}
            loadDataCallback={() => {
              fetchChats();
            }}
          />
        }
      </div>
    </div>
  );
}

export default Chats;
