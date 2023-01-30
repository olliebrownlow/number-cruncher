import { useState, useEffect } from "react";
import BackButton from "../components/backButton";
import PageHeading from "../components/pageHeading";
import StartButton from "../components/startButton";
import Spacer from "../components/spacer";
import OptionHeading from "../components/optionHeading";
import TimesTablesGrid from "../components/timesTablesGrid";
import ShortCutTableOptionsGrid from "../components/shortCutTableOptionsGrid";
import QuestionOrderingGrid from "../components/questionOrderingGrid";
import NoOfQuestionsGrid from "../components/noOfQuestionsGrid";

const GameOptions = (props) => {
  const { gameType } = props;

  const [selected, setSelected] = useState([1]);
  const [orderedQuestions, setOrderedQuestions] = useState("mixed up");
  const [numOfQuestions, setNumOfQuestions] = useState("10");
  const [numOfQuestionsReserved, setNumOfQuestionsReserved] = useState("10");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("tablesInUse") !== null
    ) {
      let tablesArray = JSON.parse(sessionStorage.getItem("tablesInUse"));

      setSelected(tablesArray);
    }
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("questionOrdering") !== null
    ) {
      setOrderedQuestions(sessionStorage.getItem("questionOrdering"));
    }
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("numOfQuestions") !== null
    ) {
      setNumOfQuestions(sessionStorage.getItem("numOfQuestions"));
    }
  }, []);

  const formattedGameTypeString = (gameType) => {
    return gameType.split("-").join(" ");
  };

  return (
    <>
      <BackButton />
      <PageHeading heading={formattedGameTypeString(gameType) + " options"} />
      <StartButton
        gameType={gameType}
        selectedTimesTables={selected}
        questionOrdering={orderedQuestions}
        numOfQuestions={numOfQuestions}
      />
      <Spacer />
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
      <Spacer />
      <OptionHeading optionHeading={"question order"} />
      <QuestionOrderingGrid
        setNumOfQuestions={setNumOfQuestions}
        setOrderedQuestions={setOrderedQuestions}
        selected={selected}
        numOfQuestionsReserved={numOfQuestionsReserved}
        orderedQuestions={orderedQuestions}
      />
      <Spacer />
      <OptionHeading optionHeading={"number of questions"} />
      <NoOfQuestionsGrid
        setNumOfQuestions={setNumOfQuestions}
        setNumOfQuestionsReserved={setNumOfQuestionsReserved}
        orderedQuestions={orderedQuestions}
        numOfQuestions={numOfQuestions}
        selected={selected}
      />
      <Spacer />
    </>
  );
};

export async function getServerSideProps({ query }) {
  const gameType = query.gameType;

  return {
    props: {
      gameType,
    },
  };
}

export default GameOptions;
