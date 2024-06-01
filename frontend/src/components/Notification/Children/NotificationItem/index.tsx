import styles from "./css/notificationItem.module.css";

function NotificationItem() {
  return (
    <div className={`${styles.notificationItemWrapper}`}>
      <div className={`${styles.userAvatar}`}>
        <img src="https://picsum.photos/id/237/200/300" alt="" />
      </div>
      <div className={`${styles.notificationItemDetails}`}>
        <div className={`${styles.notificationItemTitle}`}>Maninder</div>
        <div className={`${styles.notificationItemMsg}`}>
          Hi, whatsapp? What are you doing? hello how are you what are you doing
        </div>
      </div>
      <div className={`${styles.notificationExtraDetails}`}>
        <div className={`${styles.notificationTimestamp}`}>10:29</div>
      </div>
    </div>
  );
}

export default NotificationItem;
