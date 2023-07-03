import { useState } from "react";
import ConfirmGameReset from "../components/confirmGameReset";
import styles from "../componentStyles/ResetGameButton.module.css";

const ResetGameButton = () => {
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

  return (
    <>
      <div
        className={styles.resetButton}
        onClick={() => setShowConfirmReset(true)}
      >
        Reset game?
      </div>
      {showConfirmReset && (
        <ConfirmGameReset
          closeModal={closeModal}
          windowOnClick={windowOnClick}
          titleText={"reset the whole game. Everthing will be set to zero"}
          setShowConfirmReset={setShowConfirmReset}
        />
      )}
    </>
  );
};

export default ResetGameButton;
