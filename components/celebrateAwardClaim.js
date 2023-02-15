import ReactDOM from "react-dom";
import Image from "next/image";
import Spacer from "../components/spacer";
import chalkboard from "../public/modalChalkboard2.jpg";
import { AiOutlineUnlock } from "react-icons/ai";
import icons from "../config/icons";
import styles from "../componentStyles/CelebrateAwardClaim.module.css";

const CelebrateAwardClaim = (props) => {
  const { closeModal, windowOnClick, subText, index } = props;

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
        <Spacer size={"0.5rem"} />
        <div className={styles.text}>New Award!!</div>
        <AiOutlineUnlock className={styles.padlock + ` ${styles.pivotdrop}`} />
        {icons[index]}
        <Spacer size={"0.5rem"} />
        <div className={styles.button}>
          <div
            className={styles.closeButton + ` ${styles.fadeIn}`}
            onClick={closeModal}
          >
            Close
          </div>
        </div>
      </div>
    </aside>,
    document.body
  );
};

export default CelebrateAwardClaim;
