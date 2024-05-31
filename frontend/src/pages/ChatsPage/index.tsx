import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleModal } from "../../redux/slices/createChatSlice";
import ChatDetails from "./Children/ChatDetails";
import Chats from "./Children/Chats";
import CreateChat from "./Children/CreateChat";
import "./css/styles.css";

function ChatsPage() {
  const showModal = useAppSelector(
    (state) => state.createChat.showCreateChatModal
  );

  const dispatch = useAppDispatch();

  return (
    <div className="chatsPageWrapper">
      {showModal && (
        <CreateChat
          show={showModal}
          onHide={() => {
            dispatch(toggleModal());
          }}
        />
      )}
      <div className="leftSection">
        <Chats />
      </div>
      <div className="rightSection">
        <ChatDetails />
      </div>
    </div>
  );
}

export default ChatsPage;
