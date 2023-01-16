import { useRouter } from "next/router";
import styles from "../componentStyles/StartButton.module.css";

const StartButton = (props) => {
  const { gameType, selectedTimesTables } = props;
  const router = useRouter();

  const playGame = (e) => {
    e.preventDefault();
    if (
      typeof window !== "undefined"
    ) {
      sessionStorage.setItem("tablesInUse", selectedTimesTables);
    }
    router.push("/" + gameType);
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
