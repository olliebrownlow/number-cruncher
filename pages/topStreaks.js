import { useState, useEffect } from "react";
import Image from "next/image";
import chalkboard from "../public/hangingChalkboard.png";
import HomeButton from "../components/homeButton";
import BackButton from "../components/backButton";
import PageHeading from "../components/pageHeading";
import Spacer from "../components/spacer";
import styles from "../styles/TopStreaks.module.css";
import colours from "../config/colours";

const TopStreaks = () => {
  const [allStreaks, setAllStreaks] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const bestStreaksByDifficulty = JSON.parse(
        localStorage.getItem("bestStreaksByDifficulty")
      );
      setAllStreaks(bestStreaksByDifficulty);
    }
  }, []);

  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"Top Streaks"} />
      {Object.entries(allStreaks).map(([key, value]) => {
        return (
          <>
            <div className={styles.area}>
              <div className={styles.container}>
                <Image
                  alt="chalkboard"
                  src={chalkboard}
                  quality={100}
                  fill
                  priority
                />
              </div>
              <div className={styles.stats}>
                <div
                  className={styles.streakLevel}
                  style={{ color: colours[Math.floor(Math.random() * colours.length)] }}
                >
                  Level: {key.toLowerCase()}
                </div>
                <div className={styles.bestStreak}>{value[0]}</div>
                <span className={styles.secondStreak}>2nd: {value[1]}</span>
                <span className={styles.thirdStreak}>3rd: {value[2]}</span>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default TopStreaks;
