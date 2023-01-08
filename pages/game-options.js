import { useRouter } from "next/router";
import BackButton from "../components/backButton";
import PageHeading from "../components/pageHeading";
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
      <PageHeading heading={formattedGameTypeString(gameType) + " options"} />
      <div className={styles.startButton} onClick={playGame}>
        Start Game
      </div>
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
