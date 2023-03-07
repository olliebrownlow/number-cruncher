import { useRouter } from "next/router";
import styles from "../componentStyles/AnswerForm.module.css";

const AnswerForm = (props) => {
  const { userAnswer, handleChange, submitAnswer, resetGame } = props;
  const router = useRouter();

  return (
    <>
      {typeof window !== "undefined" &&
      JSON.parse(sessionStorage.getItem("isFinished")) ? (
        <div className={styles.gameEndOptionsGrid}>
          <div
            className={styles.gameEndButtonOptions}
            onClick={() =>
              router.push({
                pathname: "/game-options",
                query: { gameType: "practice-mode" },
              })
            }
          >
            options
          </div>
          <div className={styles.gameEndButtonReplay} onClick={resetGame}>
            replay
          </div>
          <div
            className={styles.gameEndButtonResults}
            onClick={() => router.push("/results")}
          >
            results
          </div>
        </div>
      ) : (
        <form className={styles.formGroup}>
          <input
            className={styles.userInput}
            name="answer"
            type="number"
            id="answer"
            value={userAnswer}
            autoFocus={true}
            id="answer"
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
