import { useEffect, useRef, useState } from "react";
import SearchBar from "../../../../components/SearchBar";
import { useAppDispatch } from "../../../../redux/hooks";
import { toggleModal } from "../../../../redux/slices/createChatSlice";
import ChatItem from "./Children/ChatItem";
import "./css/styles.css";
import useGetChats from "./hooks/useGetChats";
import InfiniteLoader from "../../../../components/InfiniteLoader";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetChats,
  setSelectedChat,
} from "../../../../redux/slices/chatSidebarSlice";
import useGetMessages from "../ChatDetails/hooks/useGetMessages";
import { useDebounce } from "@uidotdev/usehooks";
import useSearchChats from "./hooks/useSearchChats";
import SpinnerLoader from "../../../../components/SpinnerLoader";

function Chats() {
  const dispatch = useAppDispatch();
  const { isLoading, chats, fetchChats, hasMore } = useGetChats();
  const {
    isLoading: isSearchLoading,
    chats: searchChats,
    fetchSearchChats,
    hasMore: searchHasMore,
  } = useSearchChats();
  const { resetPagination } = useGetMessages();
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchDebouncedValue = useDebounce(searchTerm, 400);
  const [initialRender, setInittialRender] = useState<boolean>(true);

  useEffect(() => {
    dispatch(resetChats());
    fetchChats();
    setInittialRender(false);
  }, []);

  useEffect(() => {
    if (!chatId && chats.length > 0) {
      dispatch(setSelectedChat(chats[0].id));
      navigate("/" + chats[0].id);
    }
  }, [chatId, chats]);

  useEffect(() => {
    dispatch(resetChats());
    if (searchDebouncedValue.length > 0) {
      fetchSearchChats(searchDebouncedValue, 0, 10);
    }
    if (searchDebouncedValue.length == 0 && !initialRender) {
      console.log("hi");
      fetchChats(0, 10);
    }
  }, [searchDebouncedValue]);

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
      <SearchBar
        onSearchChange={(searchText: string) => {
          setSearchTerm(searchText);
        }}
      />
      <div className="chatsList">
        {isLoading && chats.length == 0 && searchDebouncedValue.length == 0 && (
          <div className="chatsLoader">
            <SpinnerLoader size="30px" color="#57039A" />
          </div>
        )}
        {isSearchLoading &&
          chats.length == 0 &&
          searchDebouncedValue.length > 0 && (
            <div className="chatsLoader">
              <SpinnerLoader size="30px" color="#57039A" />
            </div>
          )}
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
                dispatch(setSelectedChat(value.id));
                navigate("/" + value.id);
              }}
            />
          );
        })}
        {chats.length > 0 && searchDebouncedValue.length == 0 && (
          <InfiniteLoader
            hasMore={hasMore}
            loadDataCallback={() => {
              fetchChats();
            }}
          />
        )}
        {chats.length > 0 && searchDebouncedValue.length > 0 && (
          <InfiniteLoader
            hasMore={searchHasMore}
            loadDataCallback={() => {
              fetchSearchChats(searchDebouncedValue);
            }}
          />
        )}
        {!isLoading && !isSearchLoading && chats.length == 0 && (
          <div className="chatsLoader">No Chats Found</div>
        )}
      </div>
    </div>
  );
}

export default Chats;
