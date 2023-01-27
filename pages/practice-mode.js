import { useState, useEffect } from "react";
import BackButton from "../components/backButton";
import PageHeading from "../components/pageHeading";
import RightWrongCounters from "../components/rightWrongCounters";
import QuestionDisplay from "../components/questionDisplay";
import AnswerForm from "../components/answerForm";
import AnswerGrid from "../components/answerGrid";
import TablesInPlayGrid from "../components/tablesInPlayGrid";

const PracticeMode = (props) => {
  const [prevTable, setPrevTable] = useState("--");
  const [prevMultiplier, setPrevMultiplier] = useState("--");
  const [userAnswer, setUserAnswer] = useState("");
  const [userPrevAnswer, setUserPrevAnswer] = useState("--");
  const [correct, setCorrect] = useState(true);
  const [questionOrdering, setQuestionOrdering] = useState("");
  const [numOfQuestions, setNumOfQuestions] = useState("");
  // counter to force re-render of child component.
  // needed as sessionStorage state changes cannot achieve this.
  const [reRender, setReRender] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const questionOrdering = sessionStorage.getItem("questionOrdering");
      setQuestionOrdering(questionOrdering);

      const numOfQuestions = sessionStorage.getItem("numOfQuestions");
      setNumOfQuestions(numOfQuestions);
    }
    if (document.getElementById("answer")) {
      document.getElementById("answer").focus();
    }
  }, []);

  const resetCounters = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      sessionStorage.setItem("isFinished", false);
      sessionStorage.setItem("correctCounter", 0);
      sessionStorage.setItem("errorCounter", 0);
      const tablesArray = JSON.parse(sessionStorage.getItem("tablesInUse"));
      if (questionOrdering === "in order") {
        sessionStorage.setItem("currentMultiplier", 1);
        const orderedTables = tablesArray.sort((a, b) => a - b);
        sessionStorage.setItem("currentTable", orderedTables[0]);
      } else {
        const shuffledTables = tablesArray.sort(() => 0.5 - Math.random());
        sessionStorage.setItem("currentTable", shuffledTables.slice(0, 1));
        const randomMultiplier = Math.floor(Math.random() * 12) + 1;
        sessionStorage.setItem("currentMultiplier", randomMultiplier);
      }
      setReRender(reRender + 1);
      if (document.getElementById("answer")) {
        document.getElementById("answer").focus();
      }
    }
  };

  const handleChange = (event) => {
    const target = event.target;
    setUserAnswer(target.value);
  };

  const submitAnswer = (e) => {
    e.preventDefault();
    document.getElementById("answer").focus();
    setPrevTable(parseInt(sessionStorage.getItem("currentTable")));
    setPrevMultiplier(parseInt(sessionStorage.getItem("currentMultiplier")));
    setUserPrevAnswer(userAnswer);
    setUserAnswer("");
    let tablesArray = JSON.parse(sessionStorage.getItem("tablesInUse"));
    if (questionOrdering === "mixed up") {
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
    // end game if necessary
    if (questionNumber() > numOfQuestions) {
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
      <div>{numOfQuestions}</div>
      <div>{questionOrdering}</div>
      <PageHeading heading={"Practice Mode"} />
      <TablesInPlayGrid />
      <RightWrongCounters resetCounters={resetCounters} reRender={reRender} />
      <QuestionDisplay
        questionNumber={questionNumber()}
        numOfQuestions={numOfQuestions}
      />
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
    </>
  );
};

export default PracticeMode;
