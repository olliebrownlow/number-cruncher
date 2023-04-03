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
import { streakMediumGoals } from "../config/achievementGoals";
import styles from "../componentStyles/Awards.module.css";

const AwardGridStreakMedium = () => {
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
    setBestStreak(bestStreaksByDifficulty.Medium[0]);

    const reducer = (numCorrectAnswers) => {
      return function (element) {
        return element > numCorrectAnswers;
      };
    };
    const reducedGoals = streakMediumGoals.filter(
      reducer(bestStreaksByDifficulty.Medium[0])
    );
    setCurrentGoal(reducedGoals[0]);
    const isAwardClaimed = JSON.parse(
      localStorage.getItem("isStreakMediumClaimed")
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
      localStorage.getItem("isStreakMediumClaimed")
    );
    isClaimedArray[index] = true;
    localStorage.setItem("isStreakMediumClaimed", JSON.stringify(isClaimedArray));
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
      <SubHeading subheading={"(Medium Level)"} position={"center"} />
      <Spacer size={"0.5rem"} />
      <SubHeading subheading={"Your awards"} position={"left"} />
      <Spacer size={"0.5rem"} />
      <div className={styles.awardGrid}>
        {currentGoal <= streakMediumGoals[0] ? (
          <AwardLocked
            fontSize={"1.5rem"}
            correctAnswerGoal={streakMediumGoals[0]}
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
            correctAnswerGoal={streakMediumGoals[0]}
            awardStyle={"award1"}
            targetStyle={"target1"}
            awardType={"streakMediumAwards"}
            awardIndex={0}
          />
        )}
        {currentGoal <= streakMediumGoals[1] ? (
          <AwardLocked
            fontSize={"1.75rem"}
            correctAnswerGoal={streakMediumGoals[1]}
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
            correctAnswerGoal={streakMediumGoals[1]}
            awardStyle={"award1"}
            targetStyle={"target1"}
            awardType={"streakMediumAwards"}
            awardIndex={1}
          />
        )}
        {currentGoal <= streakMediumGoals[2] ? (
          <AwardLocked
            fontSize={"2rem"}
            correctAnswerGoal={streakMediumGoals[2]}
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
            correctAnswerGoal={streakMediumGoals[2]}
            awardStyle={"award2"}
            targetStyle={"target2"}
            awardType={"streakMediumAwards"}
            awardIndex={2}
          />
        )}
        {currentGoal <= streakMediumGoals[3] ? (
          <AwardLocked
            fontSize={"2.25rem"}
            correctAnswerGoal={streakMediumGoals[3]}
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
            fontSize={"2.5rem"}
            correctAnswerGoal={streakMediumGoals[3]}
            awardStyle={"award2"}
            targetStyle={"target2"}
            awardType={"streakMediumAwards"}
            awardIndex={3}
          />
        )}
        {currentGoal <= streakMediumGoals[4] ? (
          <AwardLocked
            fontSize={"2.5rem"}
            correctAnswerGoal={streakMediumGoals[4]}
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
            correctAnswerGoal={streakMediumGoals[4]}
            awardStyle={"award3"}
            targetStyle={"target3"}
            awardType={"streakMediumAwards"}
            awardIndex={4}
          />
        )}
        {currentGoal <= streakMediumGoals[5] ? (
          <AwardLocked
            fontSize={"2.75rem"}
            correctAnswerGoal={streakMediumGoals[5]}
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
            correctAnswerGoal={streakMediumGoals[5]}
            awardStyle={"award3"}
            targetStyle={"target3"}
            awardType={"streakMediumAwards"}
            awardIndex={5}
          />
        )}
      </div>
      <Spacer size={"1rem"} />
      {currentGoal <= streakMediumGoals[6] ? (
        <AwardLocked
          fontSize={"6.5rem"}
          correctAnswerGoal={streakMediumGoals[6]}
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
          correctAnswerGoal={streakMediumGoals[6]}
          awardStyle={"award3"}
          targetStyle={"target3"}
          awardType={"streakMediumAwards"}
          awardIndex={6}
        />
      )}
      {bestStreak >= streakMediumGoals[6] ? (
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
        isClaimedArray={"isStreakMediumClaimed"}
        level={"Medium"}
      />
      <Spacer />
      {showCelebration && (
        <CelebrateAwardClaim
          closeModal={closeCelebrationModal}
          windowOnClick={celebrationWindowOnClick}
          index={index}
          iconType={"starIcons"}
        />
      )}
    </div>
  );
};

export default AwardGridStreakMedium;
