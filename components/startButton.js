import { useRouter } from "next/router";
import styles from "../componentStyles/StartButton.module.css";

const StartButton = (props) => {
  const {
    gameType,
    selectedTimesTables,
    questionOrdering,
    numOfQuestions,
  } = props;
  const router = useRouter();

  const playGame = () => {
    if (selectedTimesTables.length > 0) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("questionOrdering", questionOrdering);
        sessionStorage.setItem("numOfQuestions", numOfQuestions);

        // setup new game
        sessionStorage.setItem("isFinished", false);
        sessionStorage.setItem("correctCounter", 0);
        sessionStorage.setItem("errorCounter", 0);

        const orderedSelectedTables = selectedTimesTables.sort((a, b) => a - b);
        sessionStorage.setItem(
          "tablesInUse",
          JSON.stringify(orderedSelectedTables)
        );

        if (questionOrdering === "mixed up") {
          const randomisedSelectedTables = selectedTimesTables.sort(
            () => 0.5 - Math.random()
          );
          const randomTable = randomisedSelectedTables.slice(0, 1);
          sessionStorage.setItem("currentTable", randomTable);
          sessionStorage.setItem(
            "currentMultiplier",
            Math.floor(Math.random() * 12) + 1
          );
        } else {
          sessionStorage.setItem("currentTable", orderedSelectedTables[0]);
          sessionStorage.setItem("currentMultiplier", 1);
        }
      }
      router.push("/" + gameType);
    }
  };

  return (
    <>
      <div className={styles.startButton} onClick={playGame}>
        Start Game
      </div>
    </>
  );
};

export default StartButton;
