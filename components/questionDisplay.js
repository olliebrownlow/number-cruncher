import { useState, useEffect } from "react";
import Spacer from "./spacer";
import styles from "../componentStyles/QuestionDisplay.module.css";

const QuestionDisplay = (props) => {
  const { questionNumber } = props;

  const [currentTable, setCurrentTable] = useState([]);
  const [currentMultiplier, setCurrentMultiplier] = useState([]);
  const [numOfQuestions, setNumOfQuestions] = useState([]);
  const [gameType, setGameType] = useState("");

  useEffect(() => {
    setCurrentTable(parseInt(sessionStorage.getItem("currentTable")));
    setCurrentMultiplier(parseInt(sessionStorage.getItem("currentMultiplier")));
    const gt = sessionStorage.getItem("gameType");
    setGameType(gt);
    const gameOptions = JSON.parse(sessionStorage.getItem(`${gt}GameOptions`));
    setNumOfQuestions(gameOptions.numOfQuestions);
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
          {gameType === "practice-mode" ? (
            <>
              {numOfQuestions === "no limit" ? (
                <div className={styles.questionNum}>Qu {questionNumber}</div>
              ) : (
                <div className={styles.questionNum}>
                  Qu {questionNumber} of {numOfQuestions}
                </div>
              )}
            </>
          ) : (
            <></>
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
