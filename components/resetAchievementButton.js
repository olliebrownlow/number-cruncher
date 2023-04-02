import { useState } from "react";
import ConfirmReset from "../components/confirmAchievementReset";
import styles from "../componentStyles/resetAchievementButton.module.css";

const ResetAchievementButton = (props) => {
  const {
    achType,
    refresh,
    setRefresh,
    setClaimed,
    isClaimedArray,
    level,
  } = props;

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
    if (typeof JSON.parse(localStorage.getItem(achType)) === "object") {
      const achObject = JSON.parse(localStorage.getItem(achType));
      achObject[level] = [0, 0, 0];
      localStorage.setItem(achType, JSON.stringify(achObject));
    } else {
      localStorage.setItem(achType, 0);
    }
    const resetArray = [false, false, false, false, false, false, false];
    localStorage.setItem(isClaimedArray, JSON.stringify(resetArray));
    setClaimed(resetArray);
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
          titleText={"reset your correct answers score"}
          subText={" Your progress and any awards will be lost!"}
        />
      )}
    </>
  );
};

export default ResetAchievementButton;
