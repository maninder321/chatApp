import Logo from "../../components/Logo";
import SettingDetails from "./Children/SettingDetails";
import styles from "./css/settingPage.module.css";

function SettingsPage() {
  return (
    <div className={styles.settingWrapper}>
      <div className={styles.leftSettingSection}>
        <Logo />
        <div className={styles.settingTitle}>Settings</div>
        <div className={styles.settingItems}>
          <div className={`${styles.settingItem} ${styles.settingItemActive}`}>
            <div className={styles.settingItemLogo}>
              <i className="fa-solid fa-user"></i>
            </div>
            <div className={styles.settingItemTitle}>Profile</div>
          </div>
          <div className={styles.settingItem} style={{ cursor: "not-allowed" }}>
            <div className={styles.settingItemLogo}>
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div className={styles.settingItemTitle}>Security</div>
          </div>
          <div className={styles.settingItem} style={{ cursor: "not-allowed" }}>
            <div className={styles.settingItemLogo}>
              <i className="fa-solid fa-lock"></i>
            </div>
            <div className={styles.settingItemTitle}>Account</div>
          </div>
          <div className={styles.settingItem} style={{ cursor: "not-allowed" }}>
            <div className={styles.settingItemLogo}>
              <i className="fa-solid fa-globe"></i>
            </div>
            <div className={styles.settingItemTitle}>Language</div>
          </div>
        </div>
      </div>
      <div className={styles.rightSettingSection}>
        <SettingDetails />
      </div>
    </div>
  );
}

export default SettingsPage;
