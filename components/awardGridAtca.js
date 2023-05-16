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
import { handleGems } from "../core/gemLogic";
import { correctAnswerGoals } from "../config/achievementGoals";
import styles from "../componentStyles/Awards.module.css";

const AwardGridAtca = (props) => {
  const { reload, setReload } = props;
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentGoal, setCurrentGoal] = useState(50);
  const [aTCAClaimed, setATCAClaimed] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const numCorrectAnswers = parseInt(
      localStorage.getItem("achCorrectAnswers")
    );
    setCorrectAnswers(numCorrectAnswers);

    const reducer = (numCorrectAnswers) => {
      return function (element) {
        return element > numCorrectAnswers;
      };
    };
    const reducedGoals = correctAnswerGoals.filter(reducer(numCorrectAnswers));
    setCurrentGoal(reducedGoals[0]);
    const isATCAClaimed = JSON.parse(localStorage.getItem("isATCAClaimed"));
    setATCAClaimed(isATCAClaimed);
  }, [refresh]);

  const closeCelebrationModal = () => {
    setShowCelebration(false);
    handleGems("atcaGems", index);
    setReload(reload + 1);
  };

  // close modal from window surrounding the modal itself
  const celebrationWindowOnClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowCelebration(false);
      handleGems("atcaGems", index);
      setReload(reload + 1);
    }
  };

  const getPercent = () => {
    return (correctAnswers / currentGoal) * 100;
  };

  const claimAward = (index) => {
    setShowCelebration(true);
    const isATCAClaimedArray = JSON.parse(
      localStorage.getItem("isATCAClaimed")
    );
    isATCAClaimedArray[index] = true;
    localStorage.setItem("isATCAClaimed", JSON.stringify(isATCAClaimedArray));
    setIndex(index);
    setATCAClaimed(isATCAClaimedArray);
  };

  return (
    <div className={styles.achievementContainer}>
      <Spacer size={"0.5rem"} />
      <SubHeading
        subheading={"Correct Answers"}
        position={"center"}
        fontSize={"2.5rem"}
      />
      <Spacer size={"0.5rem"} />
      <SubHeading subheading={"Your awards"} position={"left"} />
      <Spacer size={"0.5rem"} />
      <div className={styles.awardGrid}>
        {currentGoal <= correctAnswerGoals[0] ? (
          <AwardLocked
            fontSize={"1.5rem"}
            correctAnswerGoal={correctAnswerGoals[0]}
            awardStyle={"award1"}
            targetStyle={"target1"}
          />
        ) : aTCAClaimed[0] === 0 ? (
          <AwardUnclaimed
            fontSize={"1.5rem"}
            awardStyle={"award1"}
            claimAward={claimAward}
            claimIndex={0}
          />
        ) : (
          <AwardClaimed
            fontSize={"1.5rem"}
            correctAnswerGoal={correctAnswerGoals[0]}
            awardStyle={"award1"}
            targetStyle={"target1"}
            awardType={"atcaAwards"}
            awardIndex={0}
          />
        )}
        {currentGoal <= correctAnswerGoals[1] ? (
          <AwardLocked
            fontSize={"1.75rem"}
            correctAnswerGoal={correctAnswerGoals[1]}
            awardStyle={"award1"}
            targetStyle={"target1"}
          />
        ) : aTCAClaimed[1] === 0 ? (
          <AwardUnclaimed
            fontSize={"1.75rem"}
            awardStyle={"award1"}
            claimAward={claimAward}
            claimIndex={1}
          />
        ) : (
          <AwardClaimed
            fontSize={"1.75rem"}
            correctAnswerGoal={correctAnswerGoals[1]}
            awardStyle={"award1"}
            targetStyle={"target1"}
            awardType={"atcaAwards"}
            awardIndex={1}
          />
        )}
        {currentGoal <= correctAnswerGoals[2] ? (
          <AwardLocked
            fontSize={"2rem"}
            correctAnswerGoal={correctAnswerGoals[2]}
            awardStyle={"award2"}
            targetStyle={"target2"}
          />
        ) : aTCAClaimed[2] === 0 ? (
          <AwardUnclaimed
            fontSize={"2rem"}
            awardStyle={"award2"}
            claimAward={claimAward}
            claimIndex={2}
          />
        ) : (
          <AwardClaimed
            fontSize={"2.1rem"}
            correctAnswerGoal={correctAnswerGoals[2]}
            awardStyle={"award2"}
            targetStyle={"target2"}
            awardType={"atcaAwards"}
            awardIndex={2}
          />
        )}
        {currentGoal <= correctAnswerGoals[3] ? (
          <AwardLocked
            fontSize={"2.25rem"}
            correctAnswerGoal={correctAnswerGoals[3]}
            awardStyle={"award2"}
            targetStyle={"target2"}
          />
        ) : aTCAClaimed[3] === 0 ? (
          <AwardUnclaimed
            fontSize={"2.25rem"}
            awardStyle={"award2"}
            claimAward={claimAward}
            claimIndex={3}
          />
        ) : (
          <AwardClaimed
            fontSize={"2.75rem"}
            correctAnswerGoal={correctAnswerGoals[3]}
            awardStyle={"award2"}
            targetStyle={"target2"}
            awardType={"atcaAwards"}
            awardIndex={3}
          />
        )}
        {currentGoal <= correctAnswerGoals[4] ? (
          <AwardLocked
            fontSize={"2.5rem"}
            correctAnswerGoal={correctAnswerGoals[4]}
            awardStyle={"award3"}
            targetStyle={"target3"}
          />
        ) : aTCAClaimed[4] === 0 ? (
          <AwardUnclaimed
            fontSize={"2.5rem"}
            awardStyle={"award3"}
            claimAward={claimAward}
            claimIndex={4}
          />
        ) : (
          <AwardClaimed
            fontSize={"3.25rem"}
            correctAnswerGoal={correctAnswerGoals[4]}
            awardStyle={"award3"}
            targetStyle={"target3"}
            awardType={"atcaAwards"}
            awardIndex={4}
          />
        )}
        {currentGoal <= correctAnswerGoals[5] ? (
          <AwardLocked
            fontSize={"2.75rem"}
            correctAnswerGoal={correctAnswerGoals[5]}
            awardStyle={"award3"}
            targetStyle={"target3"}
          />
        ) : aTCAClaimed[5] === 0 ? (
          <AwardUnclaimed
            fontSize={"2.75rem"}
            awardStyle={"award3"}
            claimAward={claimAward}
            claimIndex={5}
          />
        ) : (
          <AwardClaimed
            fontSize={"3.75rem"}
            correctAnswerGoal={correctAnswerGoals[5]}
            awardStyle={"award3"}
            targetStyle={"target3"}
            awardType={"atcaAwards"}
            awardIndex={5}
          />
        )}
      </div>
      <Spacer size={"1rem"} />
      {currentGoal <= correctAnswerGoals[6] ? (
        <AwardLocked
          fontSize={"6.5rem"}
          correctAnswerGoal={correctAnswerGoals[6]}
          awardStyle={"award3"}
          targetStyle={"target3"}
        />
      ) : aTCAClaimed[6] === 0 ? (
        <AwardUnclaimed
          fontSize={"6.5rem"}
          awardStyle={"award3"}
          claimAward={claimAward}
          claimIndex={6}
        />
      ) : (
        <AwardClaimed
          fontSize={"6.5rem"}
          correctAnswerGoal={correctAnswerGoals[6]}
          awardStyle={"award3"}
          targetStyle={"target3"}
          awardType={"atcaAwards"}
          awardIndex={6}
        />
      )}
      {correctAnswers >= correctAnswerGoals[6] ? (
        <AwardsCompleted correctAnswers={correctAnswers} />
      ) : (
        <AwardProgress
          getPercent={getPercent}
          correctAnswers={correctAnswers}
          currentGoal={currentGoal}
        />
      )}
      <Spacer size={"0.5rem"} />
      <ResetAchievementButton
        achType={"achCorrectAnswers"}
        refresh={refresh}
        setRefresh={setRefresh}
        setClaimed={setATCAClaimed}
        isClaimedArray={"isATCAClaimed"}
      />
      <Spacer />
      {showCelebration && (
        <CelebrateAwardClaim
          closeModal={closeCelebrationModal}
          windowOnClick={celebrationWindowOnClick}
          index={index}
          iconType={"medalIcons"}
          gemType={"atcaGems"}
        />
      )}
    </div>
  );
};

export default AwardGridAtca;
