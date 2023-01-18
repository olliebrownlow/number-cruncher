import styles from "../componentStyles/QuestionDisplay.module.css";

const QuestionDisplay = (props) => {
  const { currentTable, currentMultiplier, questionNumber } = props;
  return (
    <>
    <div>Qu {questionNumber}</div>
      <div className={styles.questionDisplay}>
        {currentTable} × {currentMultiplier}
      </div>
    </>
  );
};

export default QuestionDisplay;
