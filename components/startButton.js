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
        const orderedSelectedTables = selectedTimesTables.sort((a, b) => a - b);

        sessionStorage.setItem(
          "tablesInUse",
          JSON.stringify(orderedSelectedTables)
        );
        sessionStorage.setItem("questionOrdering", questionOrdering);
        sessionStorage.setItem("numOfQuestions", numOfQuestions);

        // setup new game
        sessionStorage.setItem("isFinished", false);
        sessionStorage.setItem("correctCounter", 0);
        sessionStorage.setItem("errorCounter", 0);
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
