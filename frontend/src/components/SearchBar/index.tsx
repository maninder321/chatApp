import "./css/style.css";

function SearchBar({ className = "" }: { className?: string }) {
  return (
    <div className={`searchInput ${className}`}>
      <i className="fa-solid fa-magnifying-glass"></i>
      <input className="form-control" placeholder="Search" type="text" />
    </div>
  );
}

export default SearchBar;
