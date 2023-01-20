import { useState, useEffect } from "react";
import BackButton from "../components/backButton";
import PageHeading from "../components/pageHeading";
import StartButton from "../components/startButton";
import Spacer from "../components/spacer";
import OptionHeading from "../components/optionHeading";
import TimesTablesGrid from "../components/timesTablesGrid";
import ShortCutTableOptionsGrid from "../components/shortCutTableOptionsGrid";
import QuestionOrderingGrid from "../components/questionOrderingGrid";
import styles from "../styles/GameOptions.module.css";

const GameOptions = (props) => {
  const { gameType } = props;

  const [selected, setSelected] = useState([1]);
  const [orderedQuestions, setOrderedQuestions] = useState("mixed up");
  const [numOfQuestions, setNumOfQuestions] = useState("10");
  const [numOfQuestionsReserved, setNumOfQuestionsReserved] = useState("10");

  const noOfQus = ["10", "20", "30", "no limit"];

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("tablesInUse") !== null
    ) {
      const tablesAsString = sessionStorage.getItem("tablesInUse");
      var tablesArray = JSON.parse("[" + tablesAsString + "]");
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

  const handleNumberOfQuestions = (number) => {
    setNumOfQuestions(number);
    setNumOfQuestionsReserved(number);
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
      <TimesTablesGrid selected={selected} setSelected={setSelected} />
      <Spacer />
      <ShortCutTableOptionsGrid setSelected={setSelected} />
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
      {orderedQuestions === "mixed up" ? (
        <div className={styles.noOfQuestionsGrid}>
          {noOfQus.map((number) => (
            <div
              key={number}
              className={styles.number}
              className={
                styles.number +
                " " +
                `${number === "no limit" ? styles.stretched : ""}`
              }
              onClick={() => handleNumberOfQuestions(number)}
              style={{
                backgroundColor: numOfQuestions === number ? "darkGrey" : "",
                color: numOfQuestions === number ? "black" : "",
                fontSize: numOfQuestions === number ? "1.5rem" : "1rem",
              }}
            >
              {number}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.optionHeading}>{selected.length * 12}</div>
      )}
      <Spacer />
      <StartButton
        gameType={gameType}
        selectedTimesTables={selected}
        questionOrdering={orderedQuestions}
        numOfQuestions={numOfQuestions}
      />
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
