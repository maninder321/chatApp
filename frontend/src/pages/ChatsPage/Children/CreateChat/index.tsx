import { Modal } from "react-bootstrap";
import SearchBar from "../../../../components/SearchBar";
import SearchItem from "./Children/SearchItem";
import "./css/styles.css";
import { useState } from "react";
import CreateChatForm from "./Children/CreateChatForm";

function CreateChat({ show, onHide }: { show: boolean; onHide: any }) {
  const [showList, setShowList] = useState<boolean>(true);
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {!showList && (
              <span
                onClick={() => {
                  setShowList(true);
                }}
                className="createChatBackButton"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </span>
            )}
            Start New Chat
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ paddingTop: "0px", margin: "0px", padding: "0px" }}
        >
          <div className="createChatBody">
            {showList && (
              <>
                <SearchBar className="my-0" />
                <div className="searchItems">
                  {list.map((value, index) => {
                    return (
                      <SearchItem
                        key={value}
                        id={value}
                        name="Maninder"
                        userName="maninder7463"
                        isActive={false}
                        onClickHandle={() => {
                          console.log(value);
                          setShowList(false);
                        }}
                      />
                    );
                  })}
                </div>
              </>
            )}
            {!showList && <CreateChatForm />}
          </div>
        </Modal.Body>
        {/* <Modal.Footer>kkk</Modal.Footer> */}
      </Modal>
    </>
  );
}

export default CreateChat;
