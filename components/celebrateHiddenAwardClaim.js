import ReactDOM from "react-dom";
import Image from "next/image";
import Spacer from "../components/spacer";
import chalkboard from "../public/modalChalkboard2.jpg";
import { GiGems, GiOpenTreasureChest } from "react-icons/gi";
import styles from "../componentStyles/CelebrateHiddenAwardClaim.module.css";
import Confetti from "react-confetti";

const CelebrateHiddenAwardClaim = (props) => {
  const { closeModal, windowOnClick, awardIcon } = props;
  const height = window.innerHeight;
  const width = window.innerWidth;

  const getAwardIcon = () => {
    switch (awardIcon) {
      case "gems":
        return (
          <GiGems className={styles.gems + ` ${styles.fadeInDownDelayed}`} />
        );
      default:
        return (
          <GiGems className={styles.gems + ` ${styles.fadeInDownDelayed}`} />
        );
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
        <GiOpenTreasureChest
          className={styles.chest + ` ${styles.pivotdrop}`}
        />
        {getAwardIcon()}
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

export default CelebrateHiddenAwardClaim;
