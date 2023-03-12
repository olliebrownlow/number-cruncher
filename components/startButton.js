import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { getDifficultyLevel } from "../utils/getDifficultyLevel";
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
        // setup basic options
        const orderedSelectedTables = selectedTimesTables.sort((a, b) => a - b);
        const basicOptionsObject = {
          questionOrdering: questionOrdering,
          numOfQuestions: numOfQuestions,
          orderedSelectedTables: orderedSelectedTables,
          difficultyLevel: getDifficultyLevel(orderedSelectedTables),
        };
        sessionStorage.setItem(
          `${gameType}GameOptions`,
          JSON.stringify(basicOptionsObject)
        );
        sessionStorage.setItem("isFinished", false);
        sessionStorage.setItem("correctCounter", 0);
        sessionStorage.setItem("errorCounter", 0);
        sessionStorage.setItem("prevQuestionAnswersArray", "[]");

        // set first question
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
    } else {
      toast.error("Please select at least one times table", {
        id: "noTableSelected",
      });
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
