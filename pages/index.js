import PageHeading from "../components/pageHeading";
import gameLinks from "../config/gameLinks";
import GameLink from "../components/gameLink";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <>
      <PageHeading heading={"Number Cruncher"} />
      <div className={styles.grid}>
        {gameLinks.map((link) => (
          <GameLink
            key={link.gameTitle}
            pathName={link.pathName}
            gameType={link.gameType}
            gameTitle={link.gameTitle}
            gameDescription={link.gameDescription}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
