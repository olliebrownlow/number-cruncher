import styles from "../componentStyles/ResultStatement.module.css";

const ResultStatement = () => {
  return (
    <div className={styles.resultStatement}>
      You got{" "}
      <span className={styles.enlarged}>{typeof window !== "undefined" &&
        sessionStorage.getItem("correctCounter")}{" "}</span>
      out of{" "}
      <span className={styles.enlarged}>{typeof window !== "undefined" &&
        parseInt(sessionStorage.getItem("correctCounter")) +
          parseInt(sessionStorage.getItem("errorCounter"))}{" "}</span>
      questions right.
    </div>
  );
};

export default ResultStatement;
