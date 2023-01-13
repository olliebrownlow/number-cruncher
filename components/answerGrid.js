import styles from "../componentStyles/AnswerGrid.module.css";

const AnswerGrid = (props) => {
  const { correct, prevTable, prevMultiplier, userPrevAnswer } = props;

  const getAnswer = () => {
    if (prevTable * prevMultiplier) {
      return prevTable * prevMultiplier;
    }

    return "--";
  };

  return (
    <div className={styles.answerGrid}>
      <div>question</div>
      <div>answer</div>
      <div>your answer</div>
      {correct ? (
        <>
          <div className={styles.answerCorrectDisplay}>
            {prevTable} × {prevMultiplier}
          </div>
          <div className={styles.answerCorrectDisplay}>{getAnswer()}</div>
          <div className={styles.answerCorrectDisplay}>{userPrevAnswer}</div>
        </>
      ) : (
        <>
          <div className={styles.answerCorrectDisplay}>
            {prevTable} × {prevMultiplier}
          </div>
          <div className={styles.answerCorrectDisplay}>{getAnswer()}</div>
          <div className={styles.answerWrongDisplay}>
            {userPrevAnswer ? userPrevAnswer : "--"}
          </div>
        </>
      )}
    </div>
  );
};

export default AnswerGrid;
