import { useState } from "react";
import ConfirmReset from "../components/confirmAchievementReset";
import styles from "../componentStyles/resetAchievementButton.module.css";

const ResetHiddenAchievementButton = (props) => {
  const { refresh, setRefresh, isUnLocked, challengeType } = props;

  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const closeModal = () => {
    setShowConfirmReset(false);
  };

  // close modal from window surrounding the modal itself
  const windowOnClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowConfirmReset(false);
    }
  };

  const resetAchievement = () => {
    setShowConfirmReset(false);
    const challenge = JSON.parse(localStorage.getItem(challengeType));
    const resetObject = {
      unlockCost: challenge.unlockCost,
      unlocked: true,
      found: false,
      challengeCompleted: false,
      awardClaimed: false,
      awardGems: challenge.awardGems,
      gemsClaimed: challenge.gemsClaimed,
    };
    localStorage.setItem("hiddenAwardClicks", JSON.stringify(resetObject));
    setRefresh(refresh + 1);
  };

  return (
    <>
      <div
        className={styles.resetButton}
        onClick={() => isUnLocked && setShowConfirmReset(true)}
      >
        Reset this challenge?
      </div>
      {showConfirmReset && (
        <ConfirmReset
          closeModal={closeModal}
          windowOnClick={windowOnClick}
          handleReset={resetAchievement}
          titleText={"reset this challenge"}
          subText={"The challenge will not be locked but you will lose your progress"}
        />
      )}
    </>
  );
};

export default ResetHiddenAchievementButton;