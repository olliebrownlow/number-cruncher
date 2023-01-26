import { useRouter } from "next/router";
import styles from "../componentStyles/AnswerForm.module.css";

const AnswerForm = (props) => {
  const { userAnswer, handleChange, submitAnswer, resetCounters } = props;
  const router = useRouter();

  return (
    <>
      {typeof window !== "undefined" &&
      JSON.parse(sessionStorage.getItem("isFinished")) ? (
        <div className={styles.gameEndOptionsGrid}>
          <div
            className={styles.gameEndButton}
            onClick={() =>
              router.push({
                pathname: "/game-options",
                query: { gameType: "practice-mode" },
              })
            }
          >
            options
          </div>
          <div className={styles.gameEndButton} onClick={resetCounters}>
            replay
          </div>
          <div className={styles.gameEndButton}>results</div>
        </div>
      ) : (
        <form className={styles.formGroup}>
          <input
            className={styles.userInput}
            name="answer"
            type="number"
            id="answer"
            value={userAnswer}
            required
            autoFocus={true}
            id="answer"
            min="1"
            max="144"
            onChange={handleChange}
          />
          <button className={styles.submitButton} onClick={submitAnswer}>
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default AnswerForm;
