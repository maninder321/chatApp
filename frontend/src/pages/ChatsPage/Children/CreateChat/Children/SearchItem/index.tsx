import { NameInitialsAvatar } from "react-name-initials-avatar";
import "./css/styles.css";

function SearchItem(props: {
  id: number;
  name: string;
  userName: string;
  isActive: boolean;
  onClickHandle: () => void;
}) {
  return (
    <div
      className="searchItemWrapper"
      search-item-id={props.id}
      onClick={props.onClickHandle}
    >
      <div className="userAvatar">
        <div className="initial">
          <NameInitialsAvatar
            name={props?.name.toUpperCase() || "No Name"}
            size="60px"
            bgColor={"#EBD4FD"}
            textColor={"#57039a"}
            borderColor={"#EBD4FD"}
            textSize="23px"
          />
        </div>
        {/* <img src="https://picsum.photos/id/237/200/300" alt="" /> */}
      </div>
      <div className="searchItemDetails">
        <div className="searchItemTitle">
          {props.name + ` (${props.userName})`}
        </div>
        <div className="searchItemMsg">
          {props.isActive ? "Online" : "Offline"}
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
