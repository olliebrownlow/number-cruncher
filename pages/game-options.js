import { useRouter } from "next/router";
import BackButton from "../components/backButton";
import styles from "../styles/GameOptions.module.css";

const GameOptions = (props) => {
  const { gameType } = props;
  const router = useRouter();

  const formattedGameTypeString = (gameType) => {
    return gameType.split("-").join(" ");
  };

  const playGame = (e) => {
    e.preventDefault();
    router.push("/" + gameType);
  };

  return (
    <>
      <BackButton />
      <main className={styles.main}>
        <div className={styles.center}>
          <h1 className={styles.heading}>
            {formattedGameTypeString(gameType)} options
          </h1>
        </div>
        <div className={styles.startButton} onClick={playGame}>
          Start Game
        </div>
      </main>
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
