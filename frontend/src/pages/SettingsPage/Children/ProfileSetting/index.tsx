import styles from "./css/profileSetting.module.css";

function ProfileSetting() {
  return (
    <div className={`${styles.profileSettingWrapper}`}>
      <div className={`${styles.profileHeader}`}>
        <span>Profile Settings</span>
      </div>
      <div className={`${styles.profileBody}`}>
        <div className={`${styles.profileImageSection}`}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0XIQ_GMQoiF3GYL4ck4gpZCPaXf4dRW3Chw&s"
            alt=""
          />
          <div className={`${styles.profileImageChangeButton}`}>
            <i className="fa-solid fa-pen-to-square"></i>
            <span>Edit Profile</span>
          </div>
        </div>
        <div className={`${styles.profileSettingForm}`}>
          <input
            type="text"
            id="profileName"
            className="form-control"
            placeholder="Name"
            value="Maninder"
            disabled
          />
          <input
            type="text"
            id="profileUsername"
            className="form-control"
            placeholder="Username"
            value={"maninder7463"}
            disabled
          />
          <input
            type="text"
            id="profileEmail"
            className="form-control"
            placeholder="E-mail"
            value={"maninderjitsingh380@gmail.com"}
            disabled
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileSetting;
