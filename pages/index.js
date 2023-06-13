import PageHeading from "../components/pageHeading";
import gameLinks from "../config/gameLinks";
import AchievementsButton from "../components/achievementsButton";
import GemCount from "../components/gemCount";
import HistoryButton from "../components/historyButton";
import MasteryButton from "../components/masteryButton";
import SeeMachineButton from "../components/seeMachineButton";
import GameLink from "../components/gameLink";
import styles from "../styles/Home.module.css";

const Home = () => {

  const localStorageSpace = () => {
    // print to console local storage space used
    if (typeof window !== "undefined") {
      var _lsTotal = 0,
        _xLen,
        _x;
      for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x)) {
          continue;
        }
        _xLen = (localStorage[_x].length + _x.length) * 2;
        _lsTotal += _xLen;
      }
      console.log(
        "Used localStorage = " + (_lsTotal / 1024).toFixed(2) + " KB"
      );
    }
  };

  return (
    <>
      <AchievementsButton />
      <GemCount fixedPosition={false} />
      <HistoryButton />
      <MasteryButton />
      <PageHeading heading={"Number Cruncher"} />
      <SeeMachineButton />
      {localStorageSpace()}
      <div className={styles.grid}>
        {gameLinks.map((link) => (
          <GameLink
            key={link.gameTitle}
            pathName={link.pathName}
            gameType={link.gameType}
            gameTitle={link.gameTitle}
            gameDescription={link.gameDescription}
            newly={link.new}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
