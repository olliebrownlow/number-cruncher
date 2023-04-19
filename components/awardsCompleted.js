import Spacer from "./spacer";
import styles from "../componentStyles/Awards.module.css";

const AwardsCompleted = (props) => {
  const { correctAnswers, currentStreak } = props;
  return (
    <>
      <Spacer />
      <div className={styles.completed}>
        Congratulations, achievement complete!
      </div>
      <Spacer />
      <div className={styles.currentBest}>Best to date</div>
      <div className={styles.current}>{correctAnswers}</div>
      {currentStreak >= 0 && (
        <>
          <div className={styles.currentBest}>Current</div>
          <div className={styles.current}>{currentStreak}</div>
        </>
      )}
    </>
  );
};

export default AwardsCompleted;
