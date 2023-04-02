import ReactDOM from "react-dom";
import Image from "next/image";
import Spacer from "../components/spacer";
import chalkboard from "../public/modalChalkboard2.jpg";
import { AiOutlineUnlock } from "react-icons/ai";
import { medalIcons, sunIcons } from "../config/icons";
import styles from "../componentStyles/CelebrateAwardClaim.module.css";
import Confetti from "react-confetti";

const CelebrateAwardClaim = (props) => {
  const { closeModal, windowOnClick, index, iconType } = props;
  const height = window.innerHeight;
  const width = window.innerWidth;

  const getIconType = () => {
    switch (iconType) {
      case "medalIcons":
        return medalIcons;
      case "sunIcons":
        return sunIcons;
      default:
        medalIcons;
    }
  };

  return ReactDOM.createPortal(
    <aside className={styles.modalCover} onClick={windowOnClick}>
      <Confetti
        width={width}
        height={height}
        confettiSource={{
          x: height / 4,
          y: width,
          w: 0,
          h: 0,
        }}
        numberOfPieces={1000}
        recycle={false}
        tweenDuration={12000}
      />
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
        {getIconType()[index]}
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
