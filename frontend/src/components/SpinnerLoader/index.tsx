// import "./css/styles.css";
function SpinnerLoader({
  size,
  color = "black",
}: {
  size: string;
  color?: string;
}) {
  return (
    <div
      className="spinner-border spinner"
      style={{ width: size, height: size, color: color }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default SpinnerLoader;
