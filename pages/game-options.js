import { useState, useEffect } from "react";
import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import PageHeading from "../components/pageHeading";
import StartButton from "../components/startButton";
import Spacer from "../components/spacer";
import OptionHeading from "../components/optionHeading";
import TimesTablesGrid from "../components/timesTablesGrid";
import ShortCutTableOptionsGrid from "../components/shortCutTableOptionsGrid";
import QuestionOrderingGrid from "../components/questionOrderingGrid";
import SelectNoOfQusGrid from "../components/selectNoOfQusGrid";
import UnderConstruction from "../components/underConstruction";

const GameOptions = () => {
  const [gameType, setGameType] = useState("");
  const [selected, setSelected] = useState([1]);
  const [orderedQuestions, setOrderedQuestions] = useState("mixed up");
  const [numOfQuestions, setNumOfQuestions] = useState("10");
  const [numOfQuestionsReserved, setNumOfQuestionsReserved] = useState("10");

  useEffect(() => {
    const gt = sessionStorage.getItem("gameType");
    setGameType(gt);

    if (gt === "practice-mode") {
      setSelected([1]);
    } else {
      setSelected([1, 2, 10]);
    }

    if (sessionStorage.getItem(`${gt}GameOptions`) !== null) {
      const gameOptions = JSON.parse(
        sessionStorage.getItem(`${gt}GameOptions`)
      );
      setSelected(gameOptions.orderedSelectedTables);
      setOrderedQuestions(gameOptions.questionOrdering);
      setNumOfQuestions(gameOptions.numOfQuestions);
    }
  }, []);

  const formattedGameTypeString = (gameType) => {
    return gameType.split("-").join(" ").toLowerCase();
  };

  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={formattedGameTypeString(gameType) + " options"} />
      {gameType === "practice-mode" && (
        <>
          <StartButton
            gameType={gameType}
            selectedTimesTables={selected}
            questionOrdering={orderedQuestions}
            numOfQuestions={numOfQuestions}
          />
          <Spacer size={"1.5rem"} />
          <OptionHeading optionHeading={"tables"} />
          <TimesTablesGrid
            selected={selected}
            setSelected={setSelected}
            orderedQuestions={orderedQuestions}
            setNumOfQuestions={setNumOfQuestions}
          />
          <Spacer />
          <ShortCutTableOptionsGrid
            setSelected={setSelected}
            orderedQuestions={orderedQuestions}
            setNumOfQuestions={setNumOfQuestions}
          />
          <Spacer size={"1.5rem"} />
          <OptionHeading optionHeading={"question order"} />
          <QuestionOrderingGrid
            setNumOfQuestions={setNumOfQuestions}
            setOrderedQuestions={setOrderedQuestions}
            selected={selected}
            numOfQuestionsReserved={numOfQuestionsReserved}
            orderedQuestions={orderedQuestions}
          />
          <Spacer size={"1.5rem"} />
          <OptionHeading optionHeading={"number of questions"} />
          <SelectNoOfQusGrid
            setNumOfQuestions={setNumOfQuestions}
            setNumOfQuestionsReserved={setNumOfQuestionsReserved}
            orderedQuestions={orderedQuestions}
            numOfQuestions={numOfQuestions}
            numOfQuestionsReserved={numOfQuestionsReserved}
            selected={selected}
          />
          <Spacer />
        </>
      )}
      {gameType === "streak-challenge" && (
        <>
          <StartButton
            gameType={gameType}
            selectedTimesTables={selected}
            questionOrdering={"mixed up"}
            numOfQuestions={"no limit"}
          />
          <Spacer size={"1.5rem"} />
          <OptionHeading optionHeading={"tables"} />
          <TimesTablesGrid
            selected={selected}
            setSelected={setSelected}
            orderedQuestions={"mixed up"}
            setNumOfQuestions={setNumOfQuestions}
          />
          <Spacer />
          <ShortCutTableOptionsGrid
            setSelected={setSelected}
            orderedQuestions={"mixed up"}
            setNumOfQuestions={setNumOfQuestions}
          />
          <Spacer />
        </>
      )}
      {gameType !== "practice-mode" && gameType !== "streak-challenge" && (
        <UnderConstruction />
      )}
    </>
  );
};

export default GameOptions;
