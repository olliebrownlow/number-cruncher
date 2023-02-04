import styles from "../componentStyles/ResultStatement.module.css";

const ResultStatement = () => {
  return (
    <div className={styles.resultStatement}>
      You got{" "}
      {typeof window !== "undefined" &&
        sessionStorage.getItem("correctCounter")}{" "}
      out of{" "}
      {typeof window !== "undefined" &&
        parseInt(sessionStorage.getItem("correctCounter")) +
          parseInt(sessionStorage.getItem("errorCounter"))}{" "}
      questions right.
    </div>
  );
};

export default ResultStatement;
