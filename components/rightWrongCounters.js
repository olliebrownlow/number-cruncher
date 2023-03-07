import styles from "../componentStyles/RightWrongCounters.module.css";

const RightWrongCounters = (props) => {
  const { resetGame } = props;

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
        <div className={styles.reset} onClick={resetGame}>
          restart
        </div>
      </div>
      <div className={styles.errorCounter}>
        {getSessionItem("errorCounter")}
      </div>
    </div>
  );
};

export default RightWrongCounters;
