import { useAppDispatch } from "../../redux/hooks";
import { toggleShowNotification } from "../../redux/slices/globalSlice";
import NotificationItem from "./Children/NotificationItem";
import styles from "./css/notification.module.css";

function Notification() {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className={`${styles.notificationWrapper}`}>
        <div className={`${styles.notificationTitle}`}>Notifications</div>
        <div className={`${styles.notificationList}`}>
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
        </div>
        <div className={`${styles.notificationFooter}`}>
          <span>Clear All</span>
        </div>
      </div>
    </>
  );
}

export default Notification;
