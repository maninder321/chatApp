import "./css/styles.css";

function SearchItem() {
  return (
    <div className="searchItemWrapper">
      <div className="userAvatar">
        <img src="https://picsum.photos/id/237/200/300" alt="" />
      </div>
      <div className="searchItemDetails">
        <div className="searchItemTitle">Maninder</div>
        <div className="searchItemMsg">Online</div>
      </div>
    </div>
  );
}

export default SearchItem;
