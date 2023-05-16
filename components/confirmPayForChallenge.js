import ReactDOM from "react-dom";
import Image from "next/image";
import Spacer from "../components/spacer";
import chalkboard from "../public/modalChalkboard2.jpg";
import styles from "../componentStyles/ConfirmPayForChallenge.module.css";
import { SlDiamond } from "react-icons/sl";

const ConfirmPayForChallenge = (props) => {
  const { closeModal, windowOnClick, titleText, handlePayment } = props;

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
        <Spacer size={"1.5rem"} />
        <div className={styles.text}>
          Unlocking will cost you
        </div>
        <div className={styles.text}>
          {titleText} <SlDiamond color={"deepskyblue"} size={32}/>
        </div>
        <Spacer size={"0.5rem"} />
        <div className={styles.buttons}>
          <button className={styles.cancelButton} onClick={closeModal}>
            Cancel
          </button>
          <button className={styles.confirmButton} onClick={handlePayment}>
            Confirm
          </button>
        </div>
        <Spacer size={"1rem"} />
      </div>
    </aside>,
    document.body
  );
};

export default ConfirmPayForChallenge;
