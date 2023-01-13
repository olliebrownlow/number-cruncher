import { useState, useEffect } from "react";
import BackButton from "../components/backButton";
import PageHeading from "../components/pageHeading";
import styles from "../styles/PracticeMode.module.css";

const PracticeMode = (props) => {
  const [currentTable, setCurrentTable] = useState(0);
  const [currentMultiplier, setCurrentMultiplier] = useState(0);
  const [prevTable, setPrevTable] = useState("--");
  const [prevMultiplier, setPrevMultiplier] = useState("--");
  const [userAnswer, setUserAnswer] = useState("");
  const [userPrevAnswer, setUserPrevAnswer] = useState("--");
  const [correct, setCorrect] = useState(true);
  const [timesSign, setTimesSign] = useState("×");
  const [counter, setCounter] = useState();
  const [errorCounter, setErrorCounter] = useState();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("correctCounter") === null
    ) {
      setCounter(0);
    } else {
      const storedValue = sessionStorage.getItem("correctCounter");
      setCounter(parseInt(storedValue));
    }

    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("errorCounter") === null
    ) {
      setErrorCounter(0);
    } else {
      const storedValue = sessionStorage.getItem("errorCounter");
      setErrorCounter(parseInt(storedValue));
    }
    setCurrentTable(Math.floor(Math.random() * 11) + 1);
    setCurrentMultiplier(Math.floor(Math.random() * 11) + 1);
    document.getElementById("answer").focus();
  }, []);

  const handleChange = (event) => {
    const target = event.target;
    setUserAnswer(target.value);
  };

  const submitAnswer = (e) => {
    e.preventDefault();
    document.getElementById("answer").focus();
    setTimesSign("×");
    setPrevTable(currentTable);
    setPrevMultiplier(currentMultiplier);
    setUserPrevAnswer(userAnswer);
    setUserAnswer("");
    setCurrentTable(Math.floor(Math.random() * 11) + 1);
    setCurrentMultiplier(Math.floor(Math.random() * 11) + 1);
    if (parseInt(userAnswer) === currentTable * currentMultiplier) {
      setCounter(counter + 1);
      sessionStorage.setItem("correctCounter", counter + 1);
      setCorrect(true);
    } else {
      setErrorCounter(errorCounter + 1);
      sessionStorage.setItem("errorCounter", errorCounter + 1);
      setCorrect(false);
    }
  };

  const getSessionItem = (key) => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(key);
    }
  };

  const getAnswer = () => {
    if (prevTable * prevMultiplier) {
      return prevTable * prevMultiplier;
    } else {
      return "--"
    }
  };

  return (
    <>
      <BackButton />
      <PageHeading heading={"Practice Mode"} />
      <div className={styles.counterGrid}>
        <div className={styles.correctCounter}>
          {getSessionItem("correctCounter")
            ? getSessionItem("correctCounter")
            : 0}
        </div>
        <div className={styles.errorCounter}>
          {getSessionItem("errorCounter") ? getSessionItem("errorCounter") : 0}
        </div>
      </div>
      <div className={styles.questionDisplay}>
        {currentTable} × {currentMultiplier}
      </div>
      <form className={styles.formGroup}>
        <input
          className={styles.userInput}
          name="answer"
          type="number"
          id="answer"
          value={userAnswer}
          required
          autoFocus
          id="answer"
          min="1"
          max="144"
          onChange={handleChange}
        />
        <button className={styles.submitButton} onClick={submitAnswer}>
          Submit
        </button>
      </form>
      <div className={styles.answerGrid}>
        <div>question</div>
        <div>answer</div>
        <div>your answer</div>
        {correct ? (
          <>
            <div className={styles.answerCorrectDisplay}>
              {prevTable} {timesSign} {prevMultiplier}
            </div>
            <div className={styles.answerCorrectDisplay}>{getAnswer()}</div>
            <div className={styles.answerCorrectDisplay}>{userPrevAnswer}</div>
          </>
        ) : (
          <>
            <div className={styles.answerCorrectDisplay}>
              {prevTable} {timesSign} {prevMultiplier}
            </div>
            <div className={styles.answerCorrectDisplay}>{getAnswer()}</div>
            <div className={styles.answerWrongDisplay}>{userPrevAnswer}</div>
          </>
        )}
      </div>
    </>
  );
};

export default PracticeMode;
