import { useState, useEffect } from "react";
import BackButton from "../components/backButton";
import PageHeading from "../components/pageHeading";
import RightWrongCounters from "../components/rightWrongCounters";
import QuestionDisplay from "../components/questionDisplay";
import AnswerForm from "../components/answerForm";
import AnswerGrid from "../components/answerGrid";

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
    if (typeof window !== "undefined") {
      const tablesAsString = sessionStorage.getItem("tablesInUse");
      var tablesArray = JSON.parse("[" + tablesAsString + "]");
      const shuffledTables = tablesArray.sort(() => 0.5 - Math.random());
      const randomTable = shuffledTables.slice(0, 1);
      setCurrentTable(randomTable);
    }
    setCurrentMultiplier(Math.floor(Math.random() * 12) + 1);
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
    setUserAnswer("");const tablesAsString = sessionStorage.getItem("tablesInUse");
    var tablesArray = JSON.parse("[" + tablesAsString + "]");
    const shuffledTables = tablesArray.sort(() => 0.5 - Math.random());
    setCurrentTable(shuffledTables.slice(0, 1));
    setCurrentMultiplier(Math.floor(Math.random() * 12) + 1);
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
      <QuestionDisplay
        currentTable={currentTable}
        currentMultiplier={currentMultiplier}
      />
      <AnswerForm
        userAnswer={userAnswer}
        handleChange={handleChange}
        submitAnswer={submitAnswer}
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
