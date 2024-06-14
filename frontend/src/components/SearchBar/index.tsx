import { useState } from "react";
import "./css/style.css";

function SearchBar({
  className = "",
  onSearchChange,
}: {
  className?: string;
  onSearchChange: Function;
}) {
  return (
    <div className={`searchInput ${className}`}>
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        className="form-control"
        placeholder="Search"
        type="text"
        onChange={(e) => {
          onSearchChange(e.target.value);
        }}
      />
    </div>
  );
}

export default SearchBar;
