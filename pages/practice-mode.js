import { useState, useEffect } from "react";
import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import Spacer from "../components/spacer";
import PageHeading from "../components/pageHeading";
import RightWrongCounters from "../components/rightWrongCounters";
import QuestionDisplay from "../components/questionDisplay";
import AnswerForm from "../components/answerForm";
import AnswerGrid from "../components/answerGrid";
import TablesInPlayGrid from "../components/tablesInPlayGrid";

const PracticeMode = () => {
  const [prevTable, setPrevTable] = useState("--");
  const [prevMultiplier, setPrevMultiplier] = useState("--");
  const [userAnswer, setUserAnswer] = useState("");
  const [userPrevAnswer, setUserPrevAnswer] = useState("--");
  const [correct, setCorrect] = useState(true);
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
      // reset answer display grid
      setPrevTable("--");
      setPrevMultiplier("--");
      setUserPrevAnswer("--");
      setCorrect(true);
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

  const submitAnswer = (e) => {
    e.preventDefault();
    document.getElementById("answer").focus();
    // check answer and increment counters
    if (
      parseInt(userAnswer) ===
      parseInt(sessionStorage.getItem("currentTable")) *
        parseInt(sessionStorage.getItem("currentMultiplier"))
    ) {
      const currentCount = sessionStorage.getItem("correctCounter");
      sessionStorage.setItem("correctCounter", parseInt(currentCount) + 1);
      setCorrect(true);
    } else {
      const currentCount = sessionStorage.getItem("errorCounter");
      sessionStorage.setItem("errorCounter", parseInt(currentCount) + 1);
      setCorrect(false);
    }
    // save old question and answer
    setPrevTable(parseInt(sessionStorage.getItem("currentTable")));
    setPrevMultiplier(parseInt(sessionStorage.getItem("currentMultiplier")));
    setUserPrevAnswer(userAnswer);
    // store old question and answer
    const qAArray = JSON.parse(
      sessionStorage.getItem("prevQuestionAnswersArray")
    );
    const qAObject = {
      id: questionNumber() - 1,
      table: parseInt(sessionStorage.getItem("currentTable")),
      multiplier: parseInt(sessionStorage.getItem("currentMultiplier")),
      userAnswer: parseInt(userAnswer),
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
    if (questionNumber() > parseInt(sessionStorage.getItem("numOfQuestions"))) {
      sessionStorage.setItem("isFinished", true);
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
      <AnswerGrid
        correct={correct}
        prevTable={prevTable}
        prevMultiplier={prevMultiplier}
        userPrevAnswer={userPrevAnswer}
      />
      <Spacer />
    </>
  );
};

export default PracticeMode;
