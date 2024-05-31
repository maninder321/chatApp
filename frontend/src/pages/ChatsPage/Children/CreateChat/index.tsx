import { Modal } from "react-bootstrap";
import SearchBar from "../../../../components/SearchBar";
import SearchItem from "./Children/ChatItem";
import "./css/styles.css";

function CreateChat({ show, onHide }: { show: boolean; onHide: any }) {
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Start New Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ paddingTop: "0px", margin: "0px", padding: "0px" }}
        >
          <div className="createChatBody">
            <SearchBar className="my-0" />
            <div className="searchItems">
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>kkk</Modal.Footer> */}
      </Modal>
    </>
  );
}

export default CreateChat;
