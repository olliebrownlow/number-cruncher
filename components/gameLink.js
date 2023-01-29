import Link from "next/link";
import { Inter } from "@next/font/google";
import styles from "../componentStyles/GameLink.module.css";

const inter = Inter({ subsets: ["latin"] });

const GameLink = (props) => {
  const { pathName, gameType, gameTitle, gameDescription } = props;
  return (
    <Link
      href={
        gameType
          ? {
              pathname: pathName,
              query: { gameType: gameType },
            }
          : pathName
      }
      as={gameType ? `/${pathName}/${gameType}` : `/${pathName}`}
      className={styles.card}
    >
      <h2 className={inter.className}>
        {gameTitle} <span>-&gt;</span>
      </h2>
      <p className={inter.className}>{gameDescription}</p>
    </Link>
  );
};

export default GameLink;
