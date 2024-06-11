import { useEffect } from "react";
import SearchBar from "../../../../components/SearchBar";
import { useAppDispatch } from "../../../../redux/hooks";
import { toggleModal } from "../../../../redux/slices/createChatSlice";
import ChatItem from "./Children/ChatItem";
import "./css/styles.css";
import useGetChats from "./hooks/useGetChats";
import InfiniteLoader from "../../../../components/InfiniteLoader";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedChat } from "../../../../redux/slices/chatSidebarSlice";
import useGetMessages from "../ChatDetails/hooks/useGetMessages";

function Chats() {
  const dispatch = useAppDispatch();
  const { isLoading, chats, fetchChats, hasMore } = useGetChats();
  const { resetPagination } = useGetMessages();
  const { chatId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (!chatId && chats.length > 0) {
      navigate("/" + chats[0].id);
    }
  }, [chatId, chats]);

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
          return (
            <ChatItem
              active={chatId ? +chatId == value.id : false}
              key={value.id}
              title={value.name}
              message={value.lastMessage}
              timestamp={value.timestamp}
              unreadCount={value.unreadCount}
              onChatClick={() => {
                resetPagination();
                navigate("/" + value.id);
              }}
            />
          );
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
