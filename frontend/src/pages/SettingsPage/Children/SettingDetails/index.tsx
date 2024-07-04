import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import styles from "./css/settingDetails.module.css";
import ProfileSetting from "../ProfileSetting";

function SettingDetails() {
  return (
    <>
      <div className={`${styles.settingDetails}`}>
        <Routes>
          <Route path="/profile" element={<ProfileSetting />} />
          <Route
            path="*"
            element={<Navigate to={"/settings/profile"} replace={true} />}
          />
        </Routes>
        {/* <Outlet /> */}
      </div>
    </>
  );
}

export default SettingDetails;
