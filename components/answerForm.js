import styles from "../componentStyles/AnswerForm.module.css";

const AnswerForm = (props) => {
  const { userAnswer, handleChange, submitAnswer } = props;
  return (
    <>
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
    </>
  );
};

export default AnswerForm;
