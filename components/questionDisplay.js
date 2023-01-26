import Spacer from "./spacer";
import styles from "../componentStyles/QuestionDisplay.module.css";

const QuestionDisplay = (props) => {
  const {
    currentTable,
    currentMultiplier,
    questionNumber,
    numOfQuestions,
  } = props;
  return (
    <>
      {JSON.parse(sessionStorage.getItem("isFinished")) ? (
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
