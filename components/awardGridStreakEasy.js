import { useEffect, useState } from "react";
import SubHeading from "../components/subHeading";
import Spacer from "../components/spacer";
import AwardLocked from "../components/awardLocked";
import AwardUnclaimed from "../components/awardUnclaimed";
import AwardClaimed from "../components/awardClaimed";
import AwardsCompleted from "../components/awardsCompleted";
import AwardProgress from "../components/awardProgress";
import ResetAchievementButton from "../components/resetAchievementButton";
import CelebrateAwardClaim from "../components/celebrateAwardClaim";
import { streakEasyGoals } from "../config/achievementGoals";
import styles from "../componentStyles/Awards.module.css";

const AwardGridStreakEasy = () => {
  const [bestStreak, setBestStreak] = useState(0);
  const [currentGoal, setCurrentGoal] = useState(50);
  const [isClaimed, setIsClaimed] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const bestStreaksByDifficulty = JSON.parse(
      localStorage.getItem("bestStreaksByDifficulty")
    );
    setBestStreak(bestStreaksByDifficulty.Easy[0]);

    const reducer = (numCorrectAnswers) => {
      return function (element) {
        return element > numCorrectAnswers;
      };
    };
    const reducedGoals = streakEasyGoals.filter(
      reducer(bestStreaksByDifficulty.Easy[0])
    );
    setCurrentGoal(reducedGoals[0]);
    const isAwardClaimed = JSON.parse(
      localStorage.getItem("isStreakEasyClaimed")
    );
    setIsClaimed(isAwardClaimed);
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

  const getPercent = () => {
    return (bestStreak / currentGoal) * 100;
  };

  const claimAward = (index) => {
    setShowCelebration(true);
    const isClaimedArray = JSON.parse(
      localStorage.getItem("isStreakEasyClaimed")
    );
    isClaimedArray[index] = true;
    localStorage.setItem("isStreakEasyClaimed", JSON.stringify(isClaimedArray));
    setIndex(index);
    setIsClaimed(isClaimedArray);
  };

  return (
    <div className={styles.achievementContainer}>
      <Spacer size={"0.5rem"} />
      <SubHeading
        subheading={"Best Streak"}
        position={"center"}
        fontSize={"2.5rem"}
      />
      <SubHeading subheading={"(Easy Level)"} position={"center"} />
      <Spacer size={"0.5rem"} />
      <SubHeading subheading={"Your awards"} position={"left"} />
      <Spacer size={"0.5rem"} />
      <div className={styles.awardGrid}>
        {currentGoal <= streakEasyGoals[0] ? (
          <AwardLocked
            fontSize={"1.5rem"}
            correctAnswerGoal={streakEasyGoals[0]}
            awardStyle={"award1"}
            targetStyle={"target1"}
          />
        ) : isClaimed[0] === 0 ? (
          <AwardUnclaimed
            fontSize={"1.5rem"}
            awardStyle={"award1"}
            claimAward={claimAward}
            claimIndex={0}
          />
        ) : (
          <AwardClaimed
            fontSize={"1.5rem"}
            correctAnswerGoal={streakEasyGoals[0]}
            awardStyle={"award1"}
            targetStyle={"target1"}
            awardType={"streakEasyAwards"}
            awardIndex={0}
          />
        )}
        {currentGoal <= streakEasyGoals[1] ? (
          <AwardLocked
            fontSize={"1.75rem"}
            correctAnswerGoal={streakEasyGoals[1]}
            awardStyle={"award1"}
            targetStyle={"target1"}
          />
        ) : isClaimed[1] === 0 ? (
          <AwardUnclaimed
            fontSize={"1.75rem"}
            awardStyle={"award1"}
            claimAward={claimAward}
            claimIndex={1}
          />
        ) : (
          <AwardClaimed
            fontSize={"1.75rem"}
            correctAnswerGoal={streakEasyGoals[1]}
            awardStyle={"award1"}
            targetStyle={"target1"}
            awardType={"streakEasyAwards"}
            awardIndex={1}
          />
        )}
        {currentGoal <= streakEasyGoals[2] ? (
          <AwardLocked
            fontSize={"2rem"}
            correctAnswerGoal={streakEasyGoals[2]}
            awardStyle={"award2"}
            targetStyle={"target2"}
          />
        ) : isClaimed[2] === 0 ? (
          <AwardUnclaimed
            fontSize={"2rem"}
            awardStyle={"award2"}
            claimAward={claimAward}
            claimIndex={2}
          />
        ) : (
          <AwardClaimed
            fontSize={"2.4rem"}
            correctAnswerGoal={streakEasyGoals[2]}
            awardStyle={"award2"}
            targetStyle={"target2"}
            awardType={"streakEasyAwards"}
            awardIndex={2}
          />
        )}
        {currentGoal <= streakEasyGoals[3] ? (
          <AwardLocked
            fontSize={"2.25rem"}
            correctAnswerGoal={streakEasyGoals[3]}
            awardStyle={"award2"}
            targetStyle={"target2"}
          />
        ) : isClaimed[3] === 0 ? (
          <AwardUnclaimed
            fontSize={"2.25rem"}
            awardStyle={"award2"}
            claimAward={claimAward}
            claimIndex={3}
          />
        ) : (
          <AwardClaimed
            fontSize={"2.75rem"}
            correctAnswerGoal={streakEasyGoals[3]}
            awardStyle={"award2"}
            targetStyle={"target2"}
            awardType={"streakEasyAwards"}
            awardIndex={3}
          />
        )}
        {currentGoal <= streakEasyGoals[4] ? (
          <AwardLocked
            fontSize={"2.5rem"}
            correctAnswerGoal={streakEasyGoals[4]}
            awardStyle={"award3"}
            targetStyle={"target3"}
          />
        ) : isClaimed[4] === 0 ? (
          <AwardUnclaimed
            fontSize={"2.5rem"}
            awardStyle={"award3"}
            claimAward={claimAward}
            claimIndex={4}
          />
        ) : (
          <AwardClaimed
            fontSize={"3rem"}
            correctAnswerGoal={streakEasyGoals[4]}
            awardStyle={"award3"}
            targetStyle={"target3"}
            awardType={"streakEasyAwards"}
            awardIndex={4}
          />
        )}
        {currentGoal <= streakEasyGoals[5] ? (
          <AwardLocked
            fontSize={"2.75rem"}
            correctAnswerGoal={streakEasyGoals[5]}
            awardStyle={"award3"}
            targetStyle={"target3"}
          />
        ) : isClaimed[5] === 0 ? (
          <AwardUnclaimed
            fontSize={"2.75rem"}
            awardStyle={"award3"}
            claimAward={claimAward}
            claimIndex={5}
          />
        ) : (
          <AwardClaimed
            fontSize={"3.75rem"}
            correctAnswerGoal={streakEasyGoals[5]}
            awardStyle={"award3"}
            targetStyle={"target3"}
            awardType={"streakEasyAwards"}
            awardIndex={5}
          />
        )}
      </div>
      <Spacer size={"1rem"} />
      {currentGoal <= streakEasyGoals[6] ? (
        <AwardLocked
          fontSize={"6.5rem"}
          correctAnswerGoal={streakEasyGoals[6]}
          awardStyle={"award3"}
          targetStyle={"target3"}
        />
      ) : isClaimed[6] === 0 ? (
        <AwardUnclaimed
          fontSize={"6.5rem"}
          awardStyle={"award3"}
          claimAward={claimAward}
          claimIndex={6}
        />
      ) : (
        <AwardClaimed
          fontSize={"6.5rem"}
          correctAnswerGoal={streakEasyGoals[6]}
          awardStyle={"award3"}
          targetStyle={"target3"}
          awardType={"streakEasyAwards"}
          awardIndex={6}
        />
      )}
      {bestStreak >= streakEasyGoals[6] ? (
        <AwardsCompleted correctAnswers={bestStreak} />
      ) : (
        <AwardProgress
          getPercent={getPercent}
          correctAnswers={bestStreak}
          currentGoal={currentGoal}
        />
      )}
      <Spacer size={"0.5rem"} />
      <ResetAchievementButton
        achType={"bestStreaksByDifficulty"}
        refresh={refresh}
        setRefresh={setRefresh}
        setClaimed={setIsClaimed}
        isClaimedArray={"isStreakEasyClaimed"}
        level={"Easy"}
      />
      <Spacer />
      {showCelebration && (
        <CelebrateAwardClaim
          closeModal={closeCelebrationModal}
          windowOnClick={celebrationWindowOnClick}
          index={index}
          iconType={"sunIcons"}
        />
      )}
    </div>
  );
};

export default AwardGridStreakEasy;
