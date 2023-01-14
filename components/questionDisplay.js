import styles from "../componentStyles/QuestionDisplay.module.css";

const QuestionDisplay = (props) => {
  const { currentTable, currentMultiplier } = props;
  return (
    <>
      <div className={styles.questionDisplay}>
        {currentTable} × {currentMultiplier}
      </div>
    </>
  );
};

export default QuestionDisplay;
