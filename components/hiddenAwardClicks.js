import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SubHeading from "./subHeading";
import Spacer from "./spacer";
import ResetHiddenAchievementButton from "./resetHiddenAchievementButton";
import CelebrateHiddenAwardClaim from "./celebrateHiddenAwardClaim";
import ConfirmPayForChallenge from "./confirmPayForChallenge";
import { handleChallengeGems } from "../core/gemLogic";
import { handleMachinePartClaim } from "../core/machinePartLogic";
import styles from "../componentStyles/HiddenAwards.module.css";
import {
  GiLockedChest,
  GiOpenChest,
  GiTreasureMap,
  GiCircularSawblade,
} from "react-icons/gi";
import { SlDiamond } from "react-icons/sl";
import { ImCross } from "react-icons/im";

const HiddenAwardClicks = (props) => {
  const { reload, setReload } = props;
  const [unlockCost, setUnlockCost] = useState(0);
  const [awardGems, setAwardGems] = useState(0);
  const [isUnLocked, setIsUnLocked] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [isChallengeCompleted, setIsChallengeCompleted] = useState(false);
  const [isAwardClaimed, setIsAwardClaimed] = useState(false);
  const [isGemsClaimed, setIsGemsClaimed] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [showClue, setShowClue] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showPaymentConfirm, setShowPaymentConfirm] = useState(false);

  useEffect(() => {
    const hiddenAwardClicks = JSON.parse(
      localStorage.getItem("hiddenAwardClicks")
    );
    setUnlockCost(hiddenAwardClicks.unlockCost);
    setAwardGems(hiddenAwardClicks.awardGems);
    setIsUnLocked(hiddenAwardClicks.unlocked);
    setIsFound(hiddenAwardClicks.found);
    setIsChallengeCompleted(hiddenAwardClicks.challengeCompleted);
    setIsAwardClaimed(hiddenAwardClicks.awardClaimed);
    setIsGemsClaimed(hiddenAwardClicks.gemsClaimed);
  }, [refresh]);

  const closeCelebrationModal = () => {
    setShowCelebration(false);
    handleChallengeGems("hiddenAwardClicks");
    handleMachinePartClaim(6);
    setReload(reload + 1);
  };

  // close modal from window surrounding the modal itself
  const celebrationWindowOnClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowCelebration(false);
      handleChallengeGems("hiddenAwardClicks");
      handleMachinePartClaim(6);
      setReload(reload + 1);
    }
  };

  const closePaymentConfirmModal = () => {
    setShowPaymentConfirm(false);
  };

  // close modal from window surrounding the modal itself
  const paymentWindowOnClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowPaymentConfirm(false);
    }
  };

  const handlePayment = () => {
    const currentGemCount = JSON.parse(localStorage.getItem("gemCount"));
    const newGemCount = currentGemCount - unlockCost;
    localStorage.setItem("gemCount", newGemCount);
    const hiddenAwardClicks = JSON.parse(
      localStorage.getItem("hiddenAwardClicks")
    );
    hiddenAwardClicks.unlocked = true;
    localStorage.setItem(
      "hiddenAwardClicks",
      JSON.stringify(hiddenAwardClicks)
    );
    setIsUnLocked(true);
    setShowPaymentConfirm(false);
    setReload(reload + 1);
  };

  const unlockChallenge = () => {
    const currentGemCount = JSON.parse(localStorage.getItem("gemCount"));
    if (currentGemCount >= unlockCost) {
      setShowPaymentConfirm(true);
    } else {
      toast.custom(
        <div className={styles.toast} onClick={() => toast.remove()}>
          <ImCross color={"red"} />
          <div>Uh oh!</div>
          <div>Not enough gems</div>
          <div className={styles.gemsNeeded}>
            Collect {unlockCost - currentGemCount} ×{" "}
            <SlDiamond color={"deepskyblue"} size={16} /> more
          </div>
        </div>,
        {
          id: "unlockBuriedTreasure",
          duration: 2000,
        }
      );
    }
  };

  const claimAward = () => {
    setShowCelebration(true);
    const hiddenAwardClicks = JSON.parse(
      localStorage.getItem("hiddenAwardClicks")
    );
    hiddenAwardClicks.awardClaimed = true;
    localStorage.setItem(
      "hiddenAwardClicks",
      JSON.stringify(hiddenAwardClicks)
    );
    setRefresh(refresh + 1);
  };

  const toggleClue = () => {
    if (isUnLocked) {
      setShowClue(!showClue);
    }
  };

  const clue = [
    "Tap on something colourful",
    "Keep going, don't stop",
    "Click it enough times and",
    "A challenge will unlock",
  ];

  const challenge = [
    "To unlock the treasure chest:",
    'In Practice Mode select the "hard" tables',
    "Within a single game",
    "answer 20 questions correctly",
  ];

  return (
    <div className={styles.achievementBoxing}>
      {!isUnLocked && (
        <div className={styles.lockedMessage}>
          <div
            className={styles.unlockButton}
            onClick={() => unlockChallenge()}
          >
            Unlock for <br /> {unlockCost} ×{" "}
            <SlDiamond color={"deepskyblue"} size={20} />
          </div>
        </div>
      )}
      <div className={styles.achievementContainer}>
        <Spacer size={"0.5rem"} />
        <SubHeading
          subheading={"Buried Treasure"}
          position={"center"}
          fontSize={"2.5rem"}
        />
        <Spacer size={"0.5rem"} />
        {!isFound && (
          <div
            style={{
              filter: !isUnLocked && "blur(7px)",
              WebkitFilter: !isUnLocked && "blur(7px)",
            }}
          >
            <div className={styles.chest}>
              <GiTreasureMap color={"sienna"} />
            </div>
            <div onClick={() => toggleClue()} className={styles.status}>
              {showClue ? "Close" : "Tap for a clue"}
            </div>
            <Spacer size={"0.5rem"} />
            {showClue && (
              <>
                <div>
                  {clue.map((line, index) => (
                    <div
                      key={index}
                      className={styles.clue + ` ${styles.fadeIn}`}
                      style={{
                        animationDelay: `${(index + 1) * 100}ms`,
                        WebkitAnimationDelay: `${(index + 1) * 100}ms`,
                      }}
                    >
                      • {line} •
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        {isFound && !isChallengeCompleted && (
          <div>
            <div className={styles.chest}>
              <GiLockedChest />
            </div>
            <div onClick={() => toggleClue()} className={styles.status}>
              {showClue ? "Close" : "Reveal challenge"}
            </div>
            <Spacer size={"0.5rem"} />
            {showClue && (
              <>
                <div>
                  {challenge.map((line, index) => (
                    <div
                      key={index}
                      className={styles.clue + ` ${styles.fadeIn}`}
                      style={{
                        animationDelay: `${(index + 1) * 100}ms`,
                        WebkitAnimationDelay: `${(index + 1) * 100}ms`,
                      }}
                    >
                      • {line} •
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        {isFound && isChallengeCompleted && !isAwardClaimed && (
          <div onClick={() => claimAward()}>
            <div className={styles.chest}>
              <GiOpenChest />
            </div>
            <div className={styles.status}>Claim reward</div>
          </div>
        )}
        {isFound && isChallengeCompleted && isAwardClaimed && (
          <div>
            <GiCircularSawblade color={"#A8A9AD"} size="8rem" />
            <div className={styles.machinePartNumber}>Machine part 7</div>
            <div className={styles.machinePartName}>Circular saw</div>
            {awardGems} × <SlDiamond color={"deepskyblue"} size={16} />
          </div>
        )}
        <ResetHiddenAchievementButton
          refresh={refresh}
          setRefresh={setRefresh}
          isUnLocked={isUnLocked}
          challengeType={"hiddenAwardClicks"}
        />
        <Spacer />
        {showCelebration && (
          <CelebrateHiddenAwardClaim
            closeModal={closeCelebrationModal}
            windowOnClick={celebrationWindowOnClick}
            awardIcon={"circularSaw"}
            awardGems={awardGems}
            isGemsClaimed={isGemsClaimed}
          />
        )}
        {showPaymentConfirm && (
          <ConfirmPayForChallenge
            closeModal={closePaymentConfirmModal}
            windowOnClick={paymentWindowOnClick}
            titleText={unlockCost + " × "}
            handlePayment={handlePayment}
          />
        )}
      </div>
    </div>
  );
};

export default HiddenAwardClicks;
