import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import Spacer from "../components/spacer";
import PageHeading from "../components/pageHeading";
import RightWrongCounters from "../components/rightWrongCounters";
import QuestionDisplay from "../components/questionDisplay";
import AnswerForm from "../components/answerForm";
import AnswerGrid from "../components/answerGrid";
import EndButton from "../components/endButton";
import TablesInPlayGrid from "../components/tablesInPlayGrid";
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
  isNewAchCorrectAnswersAwardDue,
  storePreviousQuestionAndAnswer,
  questionNumber,
  setNewQuestion,
} from "../core/gamePlayLogic";

const PracticeMode = () => {
  const [userAnswer, setUserAnswer] = useState("");
  // counter to force re-render of child component.
  // needed as sessionStorage state changes cannot achieve this.
  const [reRender, setReRender] = useState(0);

  useEffect(() => {
    focusOnAnswerTextBox();
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
        isNewAchCorrectAnswersAwardDue();
      } else {
        incrementAnswerCounter("errorCounter");
        addAnswerToHistoryInfo(false);
      }
      storePreviousQuestionAndAnswer(userAnswer);
      // reset user answer for the form
      setUserAnswer("");
      // end game if necessary or set new question
      if (
        questionNumber() > parseInt(sessionStorage.getItem("numOfQuestions"))
      ) {
        endGame();
      } else {
        setNewQuestion();
      }
    } else {
      toast.error("Your answer must be between 1 and 144", {
        id: "outOfRange",
      });
    }
  };

  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"Practice Mode"} />
      <TablesInPlayGrid />
      <RightWrongCounters resetGame={resetGame} reRender={reRender} />
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
        sessionStorage.getItem("numOfQuestions") === "no limit" &&
        sessionStorage.getItem("isFinished") === "false" && (
          <>
            <EndButton endGame={endGame} />
            <Spacer />
          </>
        )}
    </>
  );
};

export default PracticeMode;
