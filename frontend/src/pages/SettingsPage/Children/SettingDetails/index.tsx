import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import styles from "./css/settingDetails.module.css";
import ProfileSetting from "../ProfileSetting";

function SettingDetails() {
  return (
    <>
      <Routes>
        <Route path="/profile" element={<ProfileSetting />} />
        <Route
          path="*"
          element={<Navigate to={"/settings/profile"} replace={true} />}
        />
      </Routes>
      <div className={`${styles.settingDetails}`}>
        <Outlet />
      </div>
    </>
  );
}

export default SettingDetails;
