import styles from "./css/logo.module.css";

function Logo() {
  return (
    <div className={styles.logoWrapper}>
      <div className={styles.logoTitle}>
        <span>talkie-talk</span>
        <i className="fa-brands fa-rocketchat"></i>
      </div>
    </div>
  );
}

export default Logo;
