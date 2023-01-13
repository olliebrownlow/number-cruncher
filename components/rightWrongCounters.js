import styles from "../componentStyles/RightWrongCounters.module.css";

const RightWrongCounters = () => {

  const getSessionItem = (key) => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(key);
    }
  };

  return (
    <div className={styles.counterGrid}>
      <div className={styles.correctCounter}>
        {getSessionItem("correctCounter")
          ? getSessionItem("correctCounter")
          : 0}
      </div>
      <div className={styles.errorCounter}>
        {getSessionItem("errorCounter") ? getSessionItem("errorCounter") : 0}
      </div>
    </div>
  );
};

export default RightWrongCounters;
