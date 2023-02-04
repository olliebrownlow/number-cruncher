import Link from "next/link";
import { Inter } from "@next/font/google";
import styles from "../componentStyles/GameLink.module.css";

const inter = Inter({ subsets: ["latin"] });

const GameLink = (props) => {
  const { pathName, gameType, gameTitle, gameDescription } = props;

  const handleGameType = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("gameType", gameType);
    }
  };

  return (
    <Link href={pathName} className={styles.card}>
      <h2 className={inter.className} onClick={handleGameType}>
        {gameTitle} <span>-&gt;</span>
        <p className={inter.className}>{gameDescription}</p>
      </h2>
    </Link>
  );
};

export default GameLink;
