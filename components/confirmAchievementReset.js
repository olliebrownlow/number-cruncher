import ReactDOM from "react-dom";
import Image from "next/image";
import Spacer from "../components/spacer";
import chalkboard from "../public/modalChalkboard2.jpg";
import styles from "../componentStyles/ConfirmAchievementReset.module.css";

const ConfirmReset = (props) => {
  const { closeModal, windowOnClick, handleReset, titleText, subText } = props;

  return ReactDOM.createPortal(
    <aside className={styles.modalCover} onClick={windowOnClick}>
      <div className={styles.modalArea}>
        <div className={styles.bgWrap}>
          <Image
            alt="chalkboard"
            src={chalkboard}
            quality={100}
            fill
            priority
          />
        </div>
        <Spacer size={"0.25rem"} />
        <div className={styles.exclamationMark}>!</div>
        <div className={styles.text}>
          Are you sure you want to {titleText}?{" "}
        </div>
        <div className={styles.buttons}>
          <button className={styles.cancelButton} onClick={closeModal}>
            Cancel
          </button>
          <button className={styles.confirmButton} onClick={handleReset}>
            Confirm
          </button>
        </div>
        {subText && <div className={styles.subText}>{subText}</div>}
      </div>
    </aside>,
    document.body
  );
};

export default ConfirmReset;
