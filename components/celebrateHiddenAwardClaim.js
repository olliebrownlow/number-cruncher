import ReactDOM from "react-dom";
import Image from "next/image";
import Spacer from "../components/spacer";
import chalkboard from "../public/modalChalkboard2.jpg";
import { SlDiamond } from "react-icons/sl";
import styles from "../componentStyles/CelebrateHiddenAwardClaim.module.css";
import Confetti from "react-confetti";

const CelebrateHiddenAwardClaim = (props) => {
  const {
    closeModal,
    windowOnClick,
    awardIcon,
    awardGems,
    isGemsClaimed,
    machinePart,
    machinePartName,
    oldIcon,
  } = props;
  const height = window.innerHeight;
  const width = window.innerWidth;

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
        <div className={styles.text}>Machine Part {machinePart}</div>
        <div className={styles.text}>- {machinePartName} -</div>
        {oldIcon}
        {awardIcon}
        <Spacer size={"0.25rem"} />
        {!isGemsClaimed && (
          <div className={styles.fadeIn}>
            {awardGems} × <SlDiamond color={"deepskyblue"} size={16} />
          </div>
        )}
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
