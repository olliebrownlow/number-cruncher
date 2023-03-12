import { useState, useEffect } from "react";
import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import PageHeading from "../components/pageHeading";
import TablesInPlayGrid from "../components/tablesInPlayGrid";
import QuestionDisplay from "../components/questionDisplay";
import AnswerForm from "../components/answerForm";
import AnswerGrid from "../components/answerGrid";
import EndButton from "../components/endButton";
import Spacer from "../components/spacer";
import { getColour } from "../utils/getColour";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import styles from "../styles/Streak.module.css";
import {
  focusOnAnswerTextBox,
  setCountersToZero,
  setFirstQuestion,
  resetPreviousQuestionAnswersArray,
  isUserAnswerPassedOrInRange,
  isCorrectAnswer,
  incrementAnswerCounter,
  incrementAchCorrectAnswers,
  addAnswerToHistoryInfo,
  newAchCorrectAnswersAwardIfDue,
  storePreviousQuestionAndAnswer,
  questionNumber,
  setNewQuestion,
} from "../core/gamePlayLogic";

const Streak = () => {
  const [userAnswer, setUserAnswer] = useState("");
  const [level, setLevel] = useState("Other");
  const [reRender, setReRender] = useState(0);

  useEffect(() => {
    focusOnAnswerTextBox();
    const gt = sessionStorage.getItem("gameType");
    const gameOptions = JSON.parse(sessionStorage.getItem(`${gt}GameOptions`));
    setLevel(gameOptions.difficultyLevel);
  }, []);

  const resetGame = (e) => {
    e.preventDefault();
    setCountersToZero();
    setFirstQuestion();
    // trigger counter reset in child component
    setReRender(reRender + 1);
    focusOnAnswerTextBox();
    resetPreviousQuestionAnswersArray();
  };

  const handleChange = (event) => {
    const target = event.target;
    setUserAnswer(target.value);
  };

  const endGame = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("isFinished", true);
      setReRender(reRender + 1);
    }
  };

  const submitAnswer = (e) => {
    e.preventDefault();
    focusOnAnswerTextBox();
    if (isUserAnswerPassedOrInRange(userAnswer)) {
      // trigger counter movement in child component when blank answer
      setReRender(reRender + 1);
      if (isCorrectAnswer(userAnswer)) {
        incrementAnswerCounter("correctCounter");
        incrementAchCorrectAnswers();
        addAnswerToHistoryInfo(true);
        newAchCorrectAnswersAwardIfDue();
        storePreviousQuestionAndAnswer(userAnswer);
        setNewQuestion();
      } else {
        addAnswerToHistoryInfo(false);
        storePreviousQuestionAndAnswer(userAnswer);
        endGame();
      }
      // reset user answer for the form
      setUserAnswer("");
    } else {
      toast.error("Your answer must be between 1 and 144", {
        id: "outOfRange",
      });
    }
  };

  const getCorrectAnswerCount = () => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("correctCounter");
    }
  };

  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"Streak Challenge"} />
      {level !== "Other" && (
        <div className={styles.level}>
          Difficulty level: {level}
          <Spacer />
        </div>
      )}
      <TablesInPlayGrid />
      <Spacer size={"2.5rem"} />
      <div className={styles.streakBarContainer}>
        <ProgressBar
          percent={25}
          filledBackground={getColour(25)}
          // unfilledBackground={25 === "0" ? "red" : ""}
        >
          <Step>{() => <div className={styles.firstStep}></div>}</Step>
          <Step>
            {() => (
              <>
                <div className={styles.label}>Streak</div>
                <div className={styles.standing}>{getCorrectAnswerCount()}</div>
              </>
            )}
          </Step>
          <Step>
            {() => (
              <div className={styles.indexedStep}>
                <div className={styles.label}>Best</div>
                <div className={styles.standing}>100</div>
              </div>
            )}
          </Step>
        </ProgressBar>
      </div>
      <Spacer />
      <QuestionDisplay questionNumber={questionNumber()} />
      <AnswerForm
        userAnswer={userAnswer}
        handleChange={handleChange}
        submitAnswer={submitAnswer}
        resetGame={resetGame}
      />
      <AnswerGrid />
      <Spacer />
      {typeof window !== "undefined" &&
        sessionStorage.getItem("isFinished") === "false" && (
          <>
            <EndButton endGame={endGame} />
            <Spacer />
          </>
        )}
    </>
  );
};

export default Streak;
