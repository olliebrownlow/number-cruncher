import { useState, useEffect } from "react";
import BackButton from "../components/backButton";
import PageHeading from "../components/pageHeading";
import RightWrongCounters from "../components/rightWrongCounters";
import AnswerGrid from "../components/answerGrid";
import styles from "../styles/PracticeMode.module.css";

const PracticeMode = (props) => {
  const [currentTable, setCurrentTable] = useState(0);
  const [currentMultiplier, setCurrentMultiplier] = useState(0);
  const [prevTable, setPrevTable] = useState("--");
  const [prevMultiplier, setPrevMultiplier] = useState("--");
  const [userAnswer, setUserAnswer] = useState("");
  const [userPrevAnswer, setUserPrevAnswer] = useState("--");
  const [correct, setCorrect] = useState(true);
  // counter to force re-render of child component.
  // needed as sessionStorage state changes cannot achieve this.
  const [reRender, setReRender] = useState(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("correctCounter") === null
    ) {
      sessionStorage.setItem("correctCounter", 0);
    }

    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("errorCounter") === null
    ) {
      sessionStorage.setItem("errorCounter", 0);
    }
    document.getElementById("answer").focus();
  }, []);

  useEffect(() => {
    setCurrentTable(Math.floor(Math.random() * 11) + 1);
    setCurrentMultiplier(Math.floor(Math.random() * 11) + 1);
    document.getElementById("answer").focus();
  }, []);

  const resetCounters = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      sessionStorage.setItem("correctCounter", 0);
      sessionStorage.setItem("errorCounter", 0);
      setReRender(reRender + 1);
      document.getElementById("answer").focus();
    }
  };

  const handleChange = (event) => {
    const target = event.target;
    setUserAnswer(target.value);
  };

  const submitAnswer = (e) => {
    e.preventDefault();
    document.getElementById("answer").focus();
    setPrevTable(currentTable);
    setPrevMultiplier(currentMultiplier);
    setUserPrevAnswer(userAnswer);
    setUserAnswer("");
    setCurrentTable(Math.floor(Math.random() * 11) + 1);
    setCurrentMultiplier(Math.floor(Math.random() * 11) + 1);
    if (parseInt(userAnswer) === currentTable * currentMultiplier) {
      const currentCount = sessionStorage.getItem("correctCounter");
      sessionStorage.setItem("correctCounter", parseInt(currentCount) + 1);
      setCorrect(true);
    } else {
      const currentCount = sessionStorage.getItem("errorCounter");
      sessionStorage.setItem("errorCounter", parseInt(currentCount) + 1);
      setCorrect(false);
    }
  };

  return (
    <>
      <BackButton />
      <PageHeading heading={"Practice Mode"} />
      <RightWrongCounters resetCounters={resetCounters} reRender={reRender} />
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
      <AnswerGrid
        correct={correct}
        prevTable={prevTable}
        prevMultiplier={prevMultiplier}
        userPrevAnswer={userPrevAnswer}
      />
    </>
  );
};

export default PracticeMode;
