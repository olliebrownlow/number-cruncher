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
import { returnUserGoals } from "../config/achievementGoals";
import styles from "../componentStyles/Awards.module.css";

const AwardGridReturnUser = () => {
  const [bestStreak, setBestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [currentGoal, setCurrentGoal] = useState(50);
  const [isClaimed, setIsClaimed] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const returnUsage = JSON.parse(localStorage.getItem("returnUsage"));
    const todayFull = new Date();
    const yesterdayInMS = todayFull.setDate(todayFull.getDate() - 1);
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(yesterdayInMS).toISOString().split("T")[0];
    setBestStreak(returnUsage[2]);
    if (returnUsage[0] === today || returnUsage[0] === yesterday) {
      setCurrentStreak(returnUsage[1]);
    } else {
      setCurrentStreak(0);
    }
    const reducer = (numCorrectAnswers) => {
      return function (element) {
        return element > numCorrectAnswers;
      };
    };
    const reducedGoals = returnUserGoals.filter(reducer(returnUsage[2]));
    setCurrentGoal(reducedGoals[0]);
    const isAwardClaimed = JSON.parse(
      localStorage.getItem("isReturnUsageClaimed")
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
    return (currentStreak / currentGoal) * 100;
  };

  const claimAward = (index) => {
    setShowCelebration(true);
    const isClaimedArray = JSON.parse(
      localStorage.getItem("isReturnUsageClaimed")
    );
    isClaimedArray[index] = true;
    localStorage.setItem(
      "isReturnUsageClaimed",
      JSON.stringify(isClaimedArray)
    );
    setIndex(index);
    setIsClaimed(isClaimedArray);
  };

  return (
    <div className={styles.achievementContainer}>
      <Spacer size={"0.5rem"} />
      <SubHeading
        subheading={"Repeat User"}
        position={"center"}
        fontSize={"2.5rem"}
      />
      <SubHeading subheading={"(Days in a Row)"} position={"center"} />
      <Spacer size={"0.5rem"} />
      <SubHeading subheading={"Your awards"} position={"left"} />
      <Spacer size={"0.5rem"} />
      <div className={styles.awardGrid}>
        {currentGoal <= returnUserGoals[0] ? (
          <AwardLocked
            fontSize={"1.5rem"}
            correctAnswerGoal={returnUserGoals[0]}
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
            correctAnswerGoal={returnUserGoals[0]}
            awardStyle={"award1"}
            targetStyle={"target1"}
            awardType={"returnUsageAwards"}
            awardIndex={0}
          />
        )}
        {currentGoal <= returnUserGoals[1] ? (
          <AwardLocked
            fontSize={"1.75rem"}
            correctAnswerGoal={returnUserGoals[1]}
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
            correctAnswerGoal={returnUserGoals[1]}
            awardStyle={"award1"}
            targetStyle={"target1"}
            awardType={"returnUsageAwards"}
            awardIndex={1}
          />
        )}
        {currentGoal <= returnUserGoals[2] ? (
          <AwardLocked
            fontSize={"2rem"}
            correctAnswerGoal={returnUserGoals[2]}
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
            correctAnswerGoal={returnUserGoals[2]}
            awardStyle={"award2"}
            targetStyle={"target2"}
            awardType={"returnUsageAwards"}
            awardIndex={2}
          />
        )}
        {currentGoal <= returnUserGoals[3] ? (
          <AwardLocked
            fontSize={"2.25rem"}
            correctAnswerGoal={returnUserGoals[3]}
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
            correctAnswerGoal={returnUserGoals[3]}
            awardStyle={"award2"}
            targetStyle={"target2"}
            awardType={"returnUsageAwards"}
            awardIndex={3}
          />
        )}
        {currentGoal <= returnUserGoals[4] ? (
          <AwardLocked
            fontSize={"2.5rem"}
            correctAnswerGoal={returnUserGoals[4]}
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
            correctAnswerGoal={returnUserGoals[4]}
            awardStyle={"award3"}
            targetStyle={"target3"}
            awardType={"returnUsageAwards"}
            awardIndex={4}
          />
        )}
        {currentGoal <= returnUserGoals[5] ? (
          <AwardLocked
            fontSize={"2.75rem"}
            correctAnswerGoal={returnUserGoals[5]}
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
            correctAnswerGoal={returnUserGoals[5]}
            awardStyle={"award3"}
            targetStyle={"target3"}
            awardType={"returnUsageAwards"}
            awardIndex={5}
          />
        )}
      </div>
      <Spacer size={"1rem"} />
      {currentGoal <= returnUserGoals[6] ? (
        <AwardLocked
          fontSize={"6.5rem"}
          correctAnswerGoal={returnUserGoals[6]}
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
          correctAnswerGoal={returnUserGoals[6]}
          awardStyle={"award3"}
          targetStyle={"target3"}
          awardType={"returnUsageAwards"}
          awardIndex={6}
        />
      )}
      {bestStreak >= returnUserGoals[6] ? (
        <AwardsCompleted
          correctAnswers={bestStreak}
          currentStreak={currentStreak}
        />
      ) : (
        <>
          <Spacer size={"0.5rem"} />
          <div className={styles.bestRepeatUserRunHeading}>
            Best run to date
          </div>
          <div className={styles.bestRepeatUserRun}>{bestStreak}</div>
          <AwardProgress
            getPercent={getPercent}
            correctAnswers={currentStreak}
            currentGoal={currentGoal}
          />
        </>
      )}
      <Spacer size={"0.5rem"} />
      <ResetAchievementButton
        achType={"returnUsage"}
        refresh={refresh}
        setRefresh={setRefresh}
        setClaimed={setIsClaimed}
        isClaimedArray={"isReturnUsageClaimed"}
      />
      <Spacer />
      {showCelebration && (
        <CelebrateAwardClaim
          closeModal={closeCelebrationModal}
          windowOnClick={celebrationWindowOnClick}
          index={index}
          iconType={"animalIcons"}
        />
      )}
    </div>
  );
};

export default AwardGridReturnUser;
