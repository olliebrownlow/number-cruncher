import ReactDOM from "react-dom";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Spacer from "../components/spacer";
import chalkboard from "../public/modalChalkboard2.jpg";
import styles from "../componentStyles/ConfirmGameReset.module.css";

const ConfirmGameReset = (props) => {
  const { closeModal, windowOnClick, titleText, setShowConfirmReset } = props;
  const router = useRouter();
  const [userAnswer, setUserAnswer] = useState("");

  const handleChange = (event) => {
    const target = event.target;
    setUserAnswer(target.value);
  };

  const resetGame = () => {
    if (userAnswer === "Reset now") {
      localStorage.clear();
      router.push("/");
    } else {
      setShowConfirmReset(false);
    }
  };

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
        <div className={styles.exclamationMark}>!!!</div>
        <div className={styles.text}>
          Are you sure you want to {titleText}.{" "}
        </div>
        <div className={styles.subText}>
          To continue, type "Reset now" into the box and press confirm. You will
          be re-directed to the home page and begin from scratch.
        </div>
        <Spacer size={"0.25rem"} />
        <form className={styles.formGroup}>
          <input
            className={styles.userInput}
            name="reset"
            type="text"
            id="reset"
            placeholder="Reset now"
            value={userAnswer}
            onChange={handleChange}
          />
        </form>
        <div className={styles.buttons}>
          <button className={styles.confirmButton} onClick={() => resetGame()}>
            Confirm
          </button>
          <button className={styles.cancelButton} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </aside>,
    document.body
  );
};

export default ConfirmGameReset;
