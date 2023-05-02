import { useState } from "react";
import ConfirmReset from "../components/confirmAchievementReset";
import styles from "../componentStyles/resetAchievementButton.module.css";

const ResetHiddenAchievementButton = (props) => {
  const { refresh, setRefresh } = props;

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
    // hidden click award
    const resetObject = {
      unlocked: false,
      challengeCompleted: false,
      awardClaimed: false,
    };
    localStorage.setItem("hiddenAwardClicks", JSON.stringify(resetObject));
    setRefresh(refresh + 1);
  };

  return (
    <>
      <div
        className={styles.resetButton}
        onClick={() => setShowConfirmReset(true)}
      >
        Reset this achievement?
      </div>
      {showConfirmReset && (
        <ConfirmReset
          closeModal={closeModal}
          windowOnClick={windowOnClick}
          handleReset={resetAchievement}
          titleText={"reset this award"}
          subText={"The award will be locked again!"}
        />
      )}
    </>
  );
};

export default ResetHiddenAchievementButton;
