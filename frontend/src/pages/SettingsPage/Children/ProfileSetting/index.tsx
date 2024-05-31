import styles from "./css/profileSetting.module.css";

function ProfileSetting() {
  return (
    <div className={`${styles.profileSettingWrapper}`}>
      <div className={`${styles.profileHeader}`}>
        <span>Profile Settings</span>
      </div>
      <div className={`${styles.profileBody}`}>
        <div className="profileLeft">left</div>
        <div className="profileRight">right</div>
      </div>
    </div>
  );
}

export default ProfileSetting;
