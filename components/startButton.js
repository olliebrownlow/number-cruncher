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
        sessionStorage.setItem("tablesInUse", selectedTimesTables);
        sessionStorage.setItem("questionOrdering", questionOrdering);
        sessionStorage.setItem("numOfQuestions", numOfQuestions);
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
