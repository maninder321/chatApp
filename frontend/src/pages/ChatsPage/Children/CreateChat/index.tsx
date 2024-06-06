import { Modal, Spinner } from "react-bootstrap";
import SearchBar from "../../../../components/SearchBar";
import SearchItem from "./Children/SearchItem";
import "./css/styles.css";
import { useEffect, useState } from "react";
import CreateChatForm from "./Children/CreateChatForm";
import useGetUsers from "./hooks/useGetUsers";
import InfiniteLoader from "../../../../components/InfiniteLoader";
import SpinnerLoader from "../../../../components/SpinnerLoader";

function CreateChat({ show, onHide }: { show: boolean; onHide: any }) {
  const [showList, setShowList] = useState<boolean>(true);
  const { isLoading, users, fetchUsers, hasMore } = useGetUsers();

  useEffect(() => {
    fetchUsers();
  }, []);

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
                  {isLoading && <SpinnerLoader size="20px" color="black" />}
                  {users.map((value, index) => {
                    return (
                      <SearchItem
                        key={value.id}
                        id={value.id}
                        name={value.name}
                        userName={value.userName}
                        isActive={false}
                        onClickHandle={() => {
                          console.log(value);
                          setShowList(false);
                        }}
                      />
                    );
                  })}
                  {
                    <InfiniteLoader
                      hasMore={hasMore}
                      loadDataCallback={() => {
                        console.log("hello");
                        fetchUsers();
                      }}
                    />
                  }
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
