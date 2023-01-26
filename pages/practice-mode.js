import { useState, useEffect } from "react";
import BackButton from "../components/backButton";
import PageHeading from "../components/pageHeading";
import RightWrongCounters from "../components/rightWrongCounters";
import QuestionDisplay from "../components/questionDisplay";
import AnswerForm from "../components/answerForm";
import AnswerGrid from "../components/answerGrid";
import TablesInPlayGrid from "../components/tablesInPlayGrid";

const PracticeMode = (props) => {
  const [finishGame, setFinishGame] = useState(true);
  const [tablesInPlay, setTablesInPlay] = useState([]);
  const [currentTable, setCurrentTable] = useState(0);
  const [currentMultiplier, setCurrentMultiplier] = useState(0);
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
    if (document.getElementById("answer")) {
      document.getElementById("answer").focus();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const questionOrdering = sessionStorage.getItem("questionOrdering");
      setQuestionOrdering(questionOrdering);

      const numOfQuestions = sessionStorage.getItem("numOfQuestions");
      setNumOfQuestions(numOfQuestions);

      const isFinished = sessionStorage.getItem("isFinished");
      setFinishGame(JSON.parse(isFinished));

      const tablesArray = JSON.parse(sessionStorage.getItem("tablesInUse"));

      if (questionOrdering === "mixed up") {
        const shuffledTables = tablesArray.sort(() => 0.5 - Math.random());
        const randomTable = shuffledTables.slice(0, 1);
        setCurrentTable(randomTable);
        setCurrentMultiplier(Math.floor(Math.random() * 12) + 1);
        const orderedTables = tablesArray.sort((a, b) => a - b);
        setTablesInPlay(orderedTables);
      } else {
        const orderedTables = tablesArray.sort((a, b) => a - b);
        if (sessionStorage.getItem("currentTable") === null) {
          sessionStorage.setItem("currentTable", orderedTables[0]);
          sessionStorage.setItem("currentMultiplier", 1);
        } else {
          setCurrentTable(parseInt(sessionStorage.getItem("currentTable")));
          setCurrentMultiplier(
            parseInt(sessionStorage.getItem("currentMultiplier"))
          );
        }
        setTablesInPlay(tablesArray);
      }
    }
    if (document.getElementById("answer")) {
      document.getElementById("answer").focus();
    }
  }, []);

  const resetCounters = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      setFinishGame(false);
      sessionStorage.setItem("isFinished", false);
      sessionStorage.setItem("correctCounter", 0);
      sessionStorage.setItem("errorCounter", 0);
      const tablesArray = JSON.parse(sessionStorage.getItem("tablesInUse"));
      if (questionOrdering === "in order") {
        sessionStorage.setItem("currentMultiplier", 1);
        setCurrentMultiplier(1);
        const orderedTables = tablesArray.sort((a, b) => a - b);
        sessionStorage.setItem("currentTable", orderedTables[0]);
        setCurrentTable(orderedTables[0]);
      } else {
        const shuffledTables = tablesArray.sort(() => 0.5 - Math.random());
        const randomTable = shuffledTables.slice(0, 1);
        setCurrentTable(randomTable);
        setCurrentMultiplier(Math.floor(Math.random() * 12) + 1);
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
    setPrevTable(currentTable);
    setPrevMultiplier(currentMultiplier);
    setUserPrevAnswer(userAnswer);
    setUserAnswer("");
    let tablesArray = JSON.parse(sessionStorage.getItem("tablesInUse"));
    if (questionOrdering === "mixed up") {
      const shuffledTables = tablesArray.sort(() => 0.5 - Math.random());
      setCurrentTable(shuffledTables.slice(0, 1));
      setCurrentMultiplier(Math.floor(Math.random() * 12) + 1);
    } else {
      if (currentMultiplier < 12) {
        const newMultiplier = currentMultiplier + 1;
        setCurrentMultiplier(newMultiplier);
        sessionStorage.setItem("currentMultiplier", newMultiplier);
      } else {
        const orderedTables = tablesArray.sort((a, b) => a - b);
        var index = orderedTables.indexOf(currentTable);
        const newTable = orderedTables[index + 1];
        setCurrentTable(newTable);
        sessionStorage.setItem("currentTable", newTable);
        setCurrentMultiplier(1);
        sessionStorage.setItem("currentMultiplier", 1);
      }
    }
    // const shuffledTables = tablesArray.sort(() => 0.5 - Math.random());
    // setCurrentTable(shuffledTables.slice(0, 1));
    // setCurrentMultiplier(Math.floor(Math.random() * 12) + 1);
    if (parseInt(userAnswer) === currentTable * currentMultiplier) {
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
      setFinishGame(true);
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
      <div>{JSON.stringify(finishGame)}</div>
      <div>{numOfQuestions}</div>
      <PageHeading heading={"Practice Mode"} />
      <TablesInPlayGrid tablesInPlay={tablesInPlay} />
      <RightWrongCounters resetCounters={resetCounters} reRender={reRender} />
      <QuestionDisplay
        finishGame={finishGame}
        questionNumber={questionNumber()}
        numOfQuestions={numOfQuestions}
        currentTable={currentTable}
        currentMultiplier={currentMultiplier}
      />
      <AnswerForm
        finishGame={finishGame}
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
