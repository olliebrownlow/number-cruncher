import { useState, useEffect } from "react";
import { X, Check } from "react-feather";
import styles from "../componentStyles/AnswerGrid.module.css";

const AnswerGrid = () => {
  const [qAndA, setQAndA] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const qAndAs = JSON.parse(
        sessionStorage.getItem("prevQuestionAnswersArray")
      );
      const indexOfLastElement = qAndAs.length - 1;
      setQAndA(qAndAs[indexOfLastElement]);
    }
  }, [
    typeof window !== "undefined" &&
      sessionStorage.getItem("prevQuestionAnswersArray"),
  ]);

  return (
    <div className={styles.answerGrid}>
      {/* question number */}
      <div className={styles.answerDisplay}>
        {qAndA ? qAndA.id + "." : "--"}
      </div>
      {/* question */}
      <div className={styles.answerDisplay}>
        {qAndA ? `${qAndA.table} × ${qAndA.multiplier}` : "-- x --"}
      </div>
      {/* correct answer*/}
      <div className={styles.answerCorrectDisplay}>
        {qAndA ? qAndA.table * qAndA.multiplier : "--"}
      </div>
      {/* user answer*/}
      {qAndA && !qAndA.isCorrect ? (
        <div className={styles.answerWrongDisplay}>
          {qAndA ? qAndA.userAnswer : "--"}
        </div>
      ) : (
        <div className={styles.answerCorrectDisplay}>
          {qAndA ? qAndA.userAnswer : "--"}
        </div>
      )}
      {/* isCorrect indicator*/}
      {qAndA && !qAndA.isCorrect ? (
        <div className={styles.answerWrongDisplay}>
          <X />
        </div>
      ) : (
        <div className={styles.answerCorrectDisplay}>
          {qAndA ? <Check /> : "--"}
        </div>
      )}
    </div>
  );
};

export default AnswerGrid;
