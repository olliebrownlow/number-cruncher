import PageHeading from "../components/pageHeading";
import GameLink from "../components/gameLink";
import styles from "../styles/Home.module.css";

const Home = (props) => {
  return (
    <>
      <PageHeading heading={"Number Cruncher"} />

      <div className={styles.grid}>
        <GameLink
          pathName={"/game-options"}
          gameType={"practice-mode"}
          gameTitle={"Practice mode"}
          gameDescription={
            "Select times tables of your choice and get those brain cells  working!"
          }
        />

        <GameLink
          pathName={"/game-options"}
          gameType={"streak"}
          gameTitle={"Streak"}
          gameDescription={
            "Get one wrong and the streak counter will reset to zero!"
          }
        />

        <GameLink
          pathName={"/game-options"}
          gameType={"play-the-percentages"}
          gameTitle={"Play the percentages"}
          gameDescription={
            "Set a question limit and see how many you can get right."
          }
        />

        <GameLink
          pathName={"/game-options"}
          gameType={"against-the-clock"}
          gameTitle={"Against the clock"}
          gameDescription={
            "Set time limits and compete for top scores. Tick tock tick tock..."
          }
        />

        <GameLink
          pathName={"/journey"}
          gameTitle={"Journey"}
          gameDescription={
            "Work through levels of increasing difficulty earning rewards as you go."
          }
        />

        <GameLink
          pathName={"/about"}
          gameTitle={"About"}
          gameDescription={"What, who and why.."}
        />
      </div>
    </>
  );
};

export default Home;
