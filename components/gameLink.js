import Link from "next/link";
import styles from "../componentStyles/GameLink.module.css";


const GameLink = (props) => {
  const { pathName, gameType, gameTitle, gameDescription } = props;

  const handleGameType = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("gameType", gameType);
    }
  };

  return (
    <Link href={pathName} className={styles.card}>
      <h2 onClick={handleGameType}>
        {gameTitle} <span>-&gt;</span>
        <p>{gameDescription}</p>
      </h2>
    </Link>
  );
};

export default GameLink;
