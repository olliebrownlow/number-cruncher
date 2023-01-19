import { useState, useEffect } from "react";
import BackButton from "../components/backButton";
import PageHeading from "../components/pageHeading";
import StartButton from "../components/startButton";
import Spacer from "../components/spacer";
import styles from "../styles/GameOptions.module.css";

const GameOptions = (props) => {
  const { gameType } = props;

  const [selected, setSelected] = useState([1]);
  const [orderedQuestions, setOrderedQuestions] = useState("mixed up");
  const [numOfQuestions, setNumOfQuestions] = useState("10");
  const [numOfQuestionsReserved, setNumOfQuestionsReserved] = useState("10");
  const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const shortCutTableOptions = [
    "all",
    "easy",
    "medium",
    "hard",
    "clear",
    "evens",
    "odds",
    "random",
  ];
  const questionOrdering = ["mixed up", "in order"];
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

  const handleTableSelect = (table) => {
    selected.includes(table)
      ? setSelected(selected.filter((s) => s !== table))
      : setSelected([...selected, table]);
  };

  const handleOrdering = (ordering) => {
    if (ordering === "in order") {
      setNumOfQuestions(selected.length * 12);
    } else {
      setNumOfQuestions(numOfQuestionsReserved);
    }
    setOrderedQuestions(ordering);
  };

  const handleNumberOfQuestions = (number) => {
    setNumOfQuestions(number);
    setNumOfQuestionsReserved(number);
  };

  const handleShortCutSelect = (shortCut) => {
    switch (shortCut) {
      case "all":
        setSelected([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        break;
      case "easy":
        setSelected([1, 2, 10]);
        break;
      case "evens":
        setSelected([2, 4, 6, 8, 10, 12]);
        break;
      case "random":
        const shuffledTables = tables.sort(() => 0.5 - Math.random());
        const randomTables = shuffledTables.slice(
          0,
          Math.floor(Math.random() * 12) + 1
        );
        setSelected(randomTables);
        break;
      case "hard":
        setSelected([4, 6, 7, 8, 9, 12]);
        break;
      case "odds":
        setSelected([1, 3, 5, 7, 9, 11]);
        break;
      case "medium":
        setSelected([3, 5, 11]);
        break;
      case "clear":
        setSelected([]);
        break;
      default:
        setSelected([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    }
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
      <div className={styles.optionHeading}>tables</div>
      <div className={styles.timestablesGrid}>
        {tables.map((table) => (
          <div
            key={table}
            className={styles.table}
            onClick={() => handleTableSelect(table)}
            style={{
              backgroundColor: selected.includes(table) ? "darkGrey" : "",
              color: selected.includes(table) ? "black" : "",
              fontSize: selected.includes(table) ? "2.5rem" : "2rem",
            }}
          >
            {table}
          </div>
        ))}
      </div>
      <div className={styles.shortCutTableOptionsGrid}>
        {shortCutTableOptions.map((shortCut) => (
          <div
            key={shortCut}
            className={styles.shortCutOption}
            onClick={() => handleShortCutSelect(shortCut)}
          >
            {shortCut}
          </div>
        ))}
      </div>
      <Spacer />
      <div className={styles.optionHeading}>question order</div>
      <div className={styles.questionOrderingGrid}>
        {questionOrdering.map((ordering) => (
          <div
            key={ordering}
            className={styles.ordering}
            onClick={() => handleOrdering(ordering)}
            style={{
              backgroundColor: orderedQuestions === ordering ? "darkGrey" : "",
              color: orderedQuestions === ordering ? "black" : "",
              fontSize: orderedQuestions === ordering ? "1.5rem" : "1rem",
            }}
          >
            {ordering}
          </div>
        ))}
      </div>
      <Spacer />
      <div className={styles.optionHeading}>number of questions</div>
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
