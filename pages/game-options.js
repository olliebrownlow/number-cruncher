import styles from "../styles/GameOptions.module.css";

const GameOptions = (props) => {
  const { gameType } = props;

  const formattedGameTypeString = (gameType) => {
    return gameType.split("-").join(" ");
  };

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1 className={styles.heading}>
          {formattedGameTypeString(gameType)} options
        </h1>
      </div>
    </main>
  );
};

export async function getServerSideProps({ query }) {
  const gameType = query.gameType;

  console.log(gameType);
  return {
    props: {
      gameType,
    },
  };
}

export default GameOptions;
