import { useEffect, useState } from "react";
import SubHeading from "./subHeading";
import Spacer from "./spacer";
import ResetHiddenAchievementButton from "./resetHiddenAchievementButton";
import CelebrateHiddenAwardClaim from "./celebrateHiddenAwardClaim";
import styles from "../componentStyles/HiddenAwards.module.css";
import {
  GiLockedChest,
  GiOpenTreasureChest,
  GiTreasureMap,
  GiGems,
} from "react-icons/gi";

const HiddenAwardClicks = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isChallengeCompleted, setIsChallengeCompleted] = useState(false);
  const [isAwardClaimed, setIsAwardClaimed] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [showClue, setShowClue] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const hiddenAwardClicks = JSON.parse(
      localStorage.getItem("hiddenAwardClicks")
    );
    setIsUnlocked(hiddenAwardClicks.unlocked);
    setIsChallengeCompleted(hiddenAwardClicks.challengeCompleted);
    setIsAwardClaimed(hiddenAwardClicks.awardClaimed);
  }, [refresh]);

  const closeCelebrationModal = () => {
    setShowCelebration(false);
  };

  // close modal from window surrounding the modal itself
  const celebrationWindowOnClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowCelebration(false);
    }
  };

  const claimAward = () => {
    const hiddenAwardClicks = JSON.parse(
      localStorage.getItem("hiddenAwardClicks")
    );
    hiddenAwardClicks.awardClaimed = true;
    localStorage.setItem(
      "hiddenAwardClicks",
      JSON.stringify(hiddenAwardClicks)
    );
    setShowCelebration(true)
    setRefresh(refresh + 1);
  };

  const toggleClue = () => {
    setShowClue(!showClue);
  };

  const clue = [
    "Tap on something colourful",
    "Keep going, don't stop",
    "Click it enough times and",
    "A challenge will unlock",
  ];

  const challenge = [
    "To unlock the treasure chest:",
    'In Practice Mode select the "hard" tables',
    "Within a single game",
    "answer 20 questions correctly",
  ];

  return (
    <div className={styles.achievementContainer}>
      <Spacer size={"0.5rem"} />
      <SubHeading
        subheading={"Buried Treasure"}
        position={"center"}
        fontSize={"2.5rem"}
      />
      <Spacer size={"0.5rem"} />
      {!isUnlocked && (
        <div>
          <div className={styles.chest}>
            <GiTreasureMap />
          </div>
          <div onClick={() => toggleClue()} className={styles.status}>
            {showClue ? "Close" : "Tap for a clue"}
          </div>
          <Spacer size={"0.5rem"} />
          {showClue && (
            <>
              <div>
                {clue.map((line, index) => (
                  <div
                    key={index}
                    className={styles.clue + ` ${styles.fadeIn}`}
                    style={{
                      animationDelay: `${(index + 1) * 100}ms`,
                      WebkitAnimationDelay: `${(index + 1) * 100}ms`,
                    }}
                  >
                    • {line} •
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
      {isUnlocked && !isChallengeCompleted && (
        <div>
          <div className={styles.chest}>
            <GiLockedChest />
          </div>
          <div onClick={() => toggleClue()} className={styles.status}>
            {showClue ? "Close" : "Reveal challenge"}
          </div>
          <Spacer size={"0.5rem"} />
          {showClue && (
            <>
              <div>
                {challenge.map((line, index) => (
                  <div
                    key={index}
                    className={styles.clue + ` ${styles.fadeIn}`}
                    style={{
                      animationDelay: `${(index + 1) * 100}ms`,
                      WebkitAnimationDelay: `${(index + 1) * 100}ms`,
                    }}
                  >
                    • {line} •
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
      {isUnlocked && isChallengeCompleted && !isAwardClaimed && (
        <div onClick={() => claimAward()}>
          <div className={styles.chest}>
            <GiOpenTreasureChest />
          </div>
          <div className={styles.status}>Claim award</div>
        </div>
      )}
      {isUnlocked && isChallengeCompleted && isAwardClaimed && (
        <div className={styles.gems}>
          <GiGems />
        </div>
      )}
      <ResetHiddenAchievementButton refresh={refresh} setRefresh={setRefresh} />
      <Spacer />
      {showCelebration && (
        <CelebrateHiddenAwardClaim
          closeModal={closeCelebrationModal}
          windowOnClick={celebrationWindowOnClick}
          iconType={"gems"}
        />
      )}
    </div>
  );
};

export default HiddenAwardClicks;
