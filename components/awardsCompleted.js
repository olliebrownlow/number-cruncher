import Spacer from "./spacer";
import styles from "../componentStyles/Awards.module.css";

const AwardsCompleted = (props) => {
  const { correctAnswers } = props;
  return (
    <>
      <Spacer />
      <div className={styles.completed}>
        Congratulations, achievement complete!
      </div>
      <Spacer />
      <div className={styles.current}>{correctAnswers}</div>
    </>
  );
};

export default AwardsCompleted;
