import { useState, useEffect } from "react";
import Spacer from "./spacer";
import styles from "../componentStyles/QuestionDisplay.module.css";

const QuestionDisplay = (props) => {
  const { questionNumber } = props;

  const [currentTable, setCurrentTable] = useState([]);
  const [currentMultiplier, setCurrentMultiplier] = useState([]);
  const [numOfQuestions, setNumOfQuestions] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentTable(parseInt(sessionStorage.getItem("currentTable")));
      setCurrentMultiplier(
        parseInt(sessionStorage.getItem("currentMultiplier"))
      );
      setNumOfQuestions(sessionStorage.getItem("numOfQuestions"));
    }
  }, [
    typeof window !== "undefined" &&
      sessionStorage.getItem("currentMultiplier"),
    typeof window !== "undefined" && sessionStorage.getItem("currentTable"),
  ]);

  return (
    <>
      {typeof window !== "undefined" &&
      JSON.parse(sessionStorage.getItem("isFinished")) ? (
        <>
          <Spacer size={"0.6rem"} />
          <div className={styles.questionDisplay}>-- × --</div>
        </>
      ) : (
        <>
          {numOfQuestions === "no limit" ? (
            <div>Qu {questionNumber}</div>
          ) : (
            <div>
              Qu {questionNumber}/{numOfQuestions}
            </div>
          )}
          <div className={styles.questionDisplay}>
            {currentTable} × {currentMultiplier}
          </div>
        </>
      )}
    </>
  );
};

export default QuestionDisplay;
