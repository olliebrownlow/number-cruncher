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
    localStorage.setItem(challengeType, JSON.stringify(resetObject));
    setRefresh(refresh + 1);
  };

  return (
    <>
      <div
        className={styles.resetButton}
        onClick={() => isUnLocked && setShowConfirmReset(true)}
        style={{
          filter: !isUnLocked && "blur(7px)",
          WebkitFilter: !isUnLocked && "blur(7px)",
        }}
      >
        Reset this challenge?
      </div>
      {showConfirmReset && (
        <ConfirmReset
          closeModal={closeModal}
          windowOnClick={windowOnClick}
          handleReset={resetAchievement}
          titleText={"reset this challenge"}
          subText={
            "This challenge will be reset but not re-locked. You won't need to pay again and you won't win any gems, but you also won't lose the machine part"
          }
        />
      )}
    </>
  );
};

export default ResetHiddenAchievementButton;
