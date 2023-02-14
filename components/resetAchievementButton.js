import { useState } from "react";
import ConfirmReset from "../components/confirmAchievementReset";
import styles from "../componentStyles/resetAchievementButton.module.css";

const ResetAchievementButton = (props) => {
  const { achType, refresh, setRefresh, setATCAClaimed } = props;

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
    localStorage.setItem(achType, 0);
    const isATCAClaimed = [false, false, false, false, false, false, false];
    localStorage.setItem("isATCAClaimed", JSON.stringify(isATCAClaimed));
    setATCAClaimed(isATCAClaimed);
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
          subText={" Your progress and any trophies will be lost!"}
        />
      )}
    </>
  );
};

export default ResetAchievementButton;
