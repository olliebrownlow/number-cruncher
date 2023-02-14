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
import correctAnswerGoals from "../config/correctAnswerGoals";

const PracticeMode = () => {
  const [userAnswer, setUserAnswer] = useState("");
  // counter to force re-render of child component.
  // needed as sessionStorage state changes cannot achieve this.
  const [reRender, setReRender] = useState(0);

  useEffect(() => {
    // focus immediately on the answer text box
    if (document.getElementById("answer")) {
      document.getElementById("answer").focus();
    }
  }, []);

  const resetCounters = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      // set counters to zero
      sessionStorage.setItem("isFinished", false);
      sessionStorage.setItem("correctCounter", 0);
      sessionStorage.setItem("errorCounter", 0);
      // set first question
      const tablesArray = JSON.parse(sessionStorage.getItem("tablesInUse"));
      if (sessionStorage.getItem("questionOrdering") === "in order") {
        sessionStorage.setItem("currentMultiplier", 1);
        const orderedTables = tablesArray.sort((a, b) => a - b);
        sessionStorage.setItem("currentTable", orderedTables[0]);
      } else {
        const shuffledTables = tablesArray.sort(() => 0.5 - Math.random());
        sessionStorage.setItem("currentTable", shuffledTables.slice(0, 1));
        const randomMultiplier = Math.floor(Math.random() * 12) + 1;
        sessionStorage.setItem("currentMultiplier", randomMultiplier);
      }
      // trigger counter reset in child component
      setReRender(reRender + 1);
      // focus on form text entry box
      if (document.getElementById("answer")) {
        document.getElementById("answer").focus();
      }
      // clear out previous questionAnswers
      sessionStorage.setItem("prevQuestionAnswersArray", "[]");
    }
  };

  const isCorrectAnswer = (table, multiplier, userAnswer) => {
    if (table * multiplier === userAnswer) {
      return true;
    }
    return false;
  };

  const handleChange = (event) => {
    const target = event.target;
    setUserAnswer(target.value);
  };

  const getUserAnswer = () => {
    if (userAnswer) {
      return parseInt(userAnswer);
    }
    return "--";
  };
  
  const getToastMessage = (index, currentGlobalCount) => {
    if (correctAnswerGoals[index + 1]) {
      return `NEW AWARD!!!\nClaim your award for getting ${
        currentGlobalCount + 1
      } questions correct! \n Next target\n${correctAnswerGoals[index + 1]}`;
    }
    return `NEW AWARD!!!\nClaim your award for getting ${
      currentGlobalCount + 1
    } questions correct!`;
  };

  const submitAnswer = (e) => {
    e.preventDefault();
    document.getElementById("answer").focus();
    if (
      (parseInt(userAnswer) > 0 && parseInt(userAnswer) < 145) ||
      !userAnswer
    ) {
      // trigger counter movement in child component when blank answer
      setReRender(reRender + 1);
      // check answer and increment counters
      if (
        isCorrectAnswer(
          parseInt(sessionStorage.getItem("currentTable")),
          parseInt(sessionStorage.getItem("currentMultiplier")),
          parseInt(userAnswer)
        )
      ) {
        // local count
        const currentCount = sessionStorage.getItem("correctCounter");
        sessionStorage.setItem("correctCounter", parseInt(currentCount) + 1);
        // global count
        const currentGlobalCount = parseInt(
          localStorage.getItem("achCorrectAnswers")
        );
        localStorage.setItem("achCorrectAnswers", currentGlobalCount + 1);
        // check for new award
        if (correctAnswerGoals.includes(currentGlobalCount + 1)) {
          const index = correctAnswerGoals.indexOf(currentGlobalCount + 1);
          const isATCAClaimedArray = JSON.parse(
            localStorage.getItem("isATCAClaimed")
          );
          isATCAClaimedArray[index] = 0;
          localStorage.setItem(
            "isATCAClaimed",
            JSON.stringify(isATCAClaimedArray)
          );
          toast.success(getToastMessage(index, currentGlobalCount), {
            id: "correctAnswersAchievement",
          });
        }
      } else {
        const currentCount = sessionStorage.getItem("errorCounter");
        sessionStorage.setItem("errorCounter", parseInt(currentCount) + 1);
      }
      // store old question and answer
      const qAArray = JSON.parse(
        sessionStorage.getItem("prevQuestionAnswersArray")
      );
      const qAObject = {
        id: questionNumber() - 1,
        table: parseInt(sessionStorage.getItem("currentTable")),
        multiplier: parseInt(sessionStorage.getItem("currentMultiplier")),
        userAnswer: getUserAnswer(),
        isCorrect: isCorrectAnswer(
          parseInt(sessionStorage.getItem("currentTable")),
          parseInt(sessionStorage.getItem("currentMultiplier")),
          parseInt(userAnswer)
        ),
      };
      qAArray.push(qAObject);
      const stringifiedQAArray = JSON.stringify(qAArray);
      sessionStorage.setItem("prevQuestionAnswersArray", stringifiedQAArray);
      // reset user answer for the form
      setUserAnswer("");
      // set new question
      let tablesArray = JSON.parse(sessionStorage.getItem("tablesInUse"));
      if (sessionStorage.getItem("questionOrdering") === "mixed up") {
        const shuffledTables = tablesArray.sort(() => 0.5 - Math.random());
        sessionStorage.setItem("currentTable", shuffledTables.slice(0, 1));
        const newMultplier = Math.floor(Math.random() * 12) + 1;
        sessionStorage.setItem("currentMultiplier", newMultplier);
      } else {
        if (parseInt(sessionStorage.getItem("currentMultiplier")) < 12) {
          const newMultiplier =
            parseInt(sessionStorage.getItem("currentMultiplier")) + 1;
          sessionStorage.setItem("currentMultiplier", newMultiplier);
        } else {
          const orderedTables = tablesArray.sort((a, b) => a - b);
          var index = orderedTables.indexOf(
            parseInt(sessionStorage.getItem("currentTable"))
          );
          sessionStorage.setItem("currentTable", orderedTables[index + 1]);
          sessionStorage.setItem("currentMultiplier", 1);
        }
      }
      // end game if necessary
      if (
        questionNumber() > parseInt(sessionStorage.getItem("numOfQuestions"))
      ) {
        sessionStorage.setItem("isFinished", true);
      }
    } else {
      toast.error("Your answer must be between 1 and 144", {
        id: "outOfRange",
      });
    }
  };

  const questionNumber = () => {
    let right;
    let wrong;
    if (typeof window !== "undefined") {
      right = sessionStorage.getItem("correctCounter");
      wrong = sessionStorage.getItem("errorCounter");
    }
    return parseInt(right) + parseInt(wrong) + 1;
  };

  const endGame = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("isFinished", true);
      setReRender(reRender + 1);
    }
  };

  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"Practice Mode"} />
      <TablesInPlayGrid />
      <RightWrongCounters resetCounters={resetCounters} reRender={reRender} />
      <QuestionDisplay questionNumber={questionNumber()} />
      <AnswerForm
        userAnswer={userAnswer}
        handleChange={handleChange}
        submitAnswer={submitAnswer}
        resetCounters={resetCounters}
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
