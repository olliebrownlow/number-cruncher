import styles from "../componentStyles/RightWrongCounters.module.css";

const RightWrongCounters = (props) => {
  const { resetCounters } = props;

  const getSessionItem = (key) => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(key);
    }
  };

  return (
    <div className={styles.counterGrid}>
      <div className={styles.correctCounter}>
        {getSessionItem("correctCounter")}
      </div>
      <div>
        <button className={styles.reset} onClick={resetCounters}>
          restart
        </button>
      </div>
      <div className={styles.errorCounter}>
        {getSessionItem("errorCounter")}
      </div>
    </div>
  );
};

export default RightWrongCounters;
