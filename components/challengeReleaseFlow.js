import { useEffect, useState } from "react";
import Image from "next/image";
import bank from "../public/bank.png";
import safe from "../public/strongbox.png";
import openSafe from "../public/openSafe2.png";
import bearTrap from "../public/wolfTrap.png";
import toast from "react-hot-toast";
import SubHeading from "./subHeading";
import Spacer from "./spacer";
import ResetHiddenAchievementButton from "./resetHiddenAchievementButton";
import CelebrateHiddenAwardClaim from "./celebrateHiddenAwardClaim";
import ConfirmPayForChallenge from "./confirmPayForChallenge";
import { handleChallengeGems } from "../core/gemLogic";
import { handleMachinePartClaim } from "../core/machinePartLogic";
import styles from "../componentStyles/HiddenAwards.module.css";
import releaseFlowIcons from "../config/releaseFlowIcons";
import colours from "../config/colours";
import { GiExitDoor, GiDoor } from "react-icons/gi";
import { SlDiamond } from "react-icons/sl";
import { ImCross } from "react-icons/im";

const ChallengeReleaseFlow = (props) => {
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
  const [colourIndices, setColourIndices] = useState([]);
  const [iconIndices, setIconIndices] = useState([]);

  useEffect(() => {
    const challengeReleaseFlow = JSON.parse(
      localStorage.getItem("challengeReleaseFlow")
    );
    setUnlockCost(challengeReleaseFlow.unlockCost);
    setAwardGems(challengeReleaseFlow.awardGems);
    setIsUnLocked(challengeReleaseFlow.unlocked);
    setIsFound(challengeReleaseFlow.found);
    setIsChallengeCompleted(challengeReleaseFlow.challengeCompleted);
    setIsAwardClaimed(challengeReleaseFlow.awardClaimed);
    setIsGemsClaimed(challengeReleaseFlow.gemsClaimed);
    const releaseFlowIcons = JSON.parse(
      localStorage.getItem("releaseFlowIcons")
    );
    const releaseFlowColours = JSON.parse(
      localStorage.getItem("releaseFlowColours")
    );
    setIconIndices(releaseFlowIcons);
    setColourIndices(releaseFlowColours);
  }, [refresh]);

  const closeCelebrationModal = () => {
    setShowCelebration(false);
    handleChallengeGems("challengeReleaseFlow");
    handleMachinePartClaim(11);
    setReload(reload + 1);
  };

  // close modal from window surrounding the modal itself
  const celebrationWindowOnClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowCelebration(false);
      handleChallengeGems("challengeReleaseFlow");
      handleMachinePartClaim(11);
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
    const challengeReleaseFlow = JSON.parse(
      localStorage.getItem("challengeReleaseFlow")
    );
    challengeReleaseFlow.unlocked = true;
    localStorage.setItem(
      "challengeReleaseFlow",
      JSON.stringify(challengeReleaseFlow)
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
          id: "unlockReleaseFlow",
          duration: 2000,
        }
      );
    }
  };

  const claimAward = () => {
    setShowCelebration(true);
    const challengeReleaseFlow = JSON.parse(
      localStorage.getItem("challengeReleaseFlow")
    );
    challengeReleaseFlow.awardClaimed = true;
    localStorage.setItem(
      "challengeReleaseFlow",
      JSON.stringify(challengeReleaseFlow)
    );
    setRefresh(refresh + 1);
  };

  const toggleClue = () => {
    if (isUnLocked) {
      setShowClue(!showClue);
    }
  };

  const clue = ["It's all ABOUT the RELEASES"];

  const challenge = [
    "To crack the safe:",
    'In Practice Mode select the "medium" tables',
    "Within a single game",
    "Answer 50 questions correctly",
  ];

  const handleColour = (arrayIndex) => {
    const newColours = colourIndices;
    if (newColours[arrayIndex] < 11) {
      newColours[arrayIndex] = newColours[arrayIndex] + 1;
    } else {
      newColours[arrayIndex] = 0;
    }
    localStorage.setItem("releaseFlowColours", JSON.stringify(newColours));
    setColourIndices(newColours);
    setRefresh(refresh + 1);
  };

  const handleIcon = (arrayIndex) => {
    const newIcons = iconIndices;
    if (newIcons[arrayIndex] < 11) {
      newIcons[arrayIndex] = newIcons[arrayIndex] + 1;
    } else {
      newIcons[arrayIndex] = 0;
    }
    localStorage.setItem("releaseFlowIcons", JSON.stringify(newIcons));
    setIconIndices(newIcons);
    setRefresh(refresh + 1);
  };

  const handleBankEnter = () => {
    if (
      localStorage.getItem("releaseFlowIcons") === "[10,6,4,8]" &&
      localStorage.getItem("releaseFlowColours") === "[10,5,7,8]"
    ) {
      const challengeReleaseFlow = JSON.parse(
        localStorage.getItem("challengeReleaseFlow")
      );
      challengeReleaseFlow.found = true;
      localStorage.setItem(
        "challengeReleaseFlow",
        JSON.stringify(challengeReleaseFlow)
      );
      toast.custom(
        <div onClick={() => toast.remove()} className={styles.toast}>
          <div> BANK ENTRY GAINED! </div>
          <div className={styles.bank}>
            <GiExitDoor />
          </div>
          <Spacer size={"0.5rem"} />
          <div> Complete the challenge to break into the safe </div>
          <Spacer size={"0.5rem"} />
        </div>,
        {
          id: "bankEntry",
          duration: 5000,
        }
      );
    } else {
      toast.custom(
        <div onClick={() => toast.remove()} className={styles.toast}>
          <div> INCORRECT PASSCODE </div>
          <div className={styles.bank}>
            <GiDoor />
          </div>
          <Spacer size={"0.5rem"} />
          <div> RESET APPLIED </div>
          <Spacer size={"0.5rem"} />
        </div>,
        {
          id: "bankEntryFail",
          duration: 5000,
        }
      );
    }
    const resetIconsAndColours = [0, 0, 0, 0];
    localStorage.setItem(
      "releaseFlowIcons",
      JSON.stringify(resetIconsAndColours)
    );
    setIconIndices(resetIconsAndColours);
    localStorage.setItem(
      "releaseFlowColours",
      JSON.stringify(resetIconsAndColours)
    );
    setColourIndices(resetIconsAndColours);
    setRefresh(refresh + 1);
  };

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
          subheading={"Safe Break"}
          position={"center"}
          fontSize={"2.5rem"}
        />
        {!isFound && (
          <div
            style={{
              filter: !isUnLocked && "blur(7px)",
              WebkitFilter: !isUnLocked && "blur(7px)",
            }}
          >
            <div className={styles.iconImages}>
              <Image
                alt="Bank"
                src={bank}
                quality={100}
                height={200}
                width={200}
                priority
              />
            </div>
            <div style={{ fontWeight: "700", whiteSpace: "nowrap" }}>
              enter the bank
            </div>
            <Spacer size={"0.75rem"} />
            <div className={styles.releaseIcons}>
              <div className={styles.iconButton} onClick={() => handleIcon(0)}>
                icon
              </div>
              <div></div>
              <div className={styles.iconButton} onClick={() => handleIcon(1)}>
                icon
              </div>
              <div></div>
              <div className={styles.iconButton} onClick={() => handleIcon(2)}>
                icon
              </div>
              <div></div>
              <div className={styles.iconButton} onClick={() => handleIcon(3)}>
                icon
              </div>
            </div>
            <div className={styles.releaseIcons}>
              <div
                className={styles.releaseIcon}
                style={{ color: colours[colourIndices[0]] }}
              >
                {releaseFlowIcons[iconIndices[0]]}
              </div>
              &lt;-
              <div
                className={styles.releaseIcon}
                style={{ color: colours[colourIndices[1]] }}
              >
                {releaseFlowIcons[iconIndices[1]]}
              </div>
              &lt;-
              <div
                className={styles.releaseIcon}
                style={{ color: colours[colourIndices[2]] }}
              >
                {releaseFlowIcons[iconIndices[2]]}
              </div>
              &lt;-
              <div
                className={styles.releaseIcon}
                style={{ color: colours[colourIndices[3]] }}
              >
                {releaseFlowIcons[iconIndices[3]]}
              </div>
            </div>
            <div className={styles.releaseIcons}>
              <div
                className={styles.colourButton}
                onClick={() => handleColour(0)}
              >
                colour
              </div>
              <div></div>
              <div
                className={styles.colourButton}
                onClick={() => handleColour(1)}
              >
                colour
              </div>
              <div></div>
              <div
                className={styles.colourButton}
                onClick={() => handleColour(2)}
              >
                colour
              </div>
              <div></div>
              <div
                className={styles.colourButton}
                onClick={() => handleColour(3)}
              >
                colour
              </div>
            </div>
            <Spacer size={"0.75rem"} />
            <div
              onClick={() => handleBankEnter()}
              className={styles.enterButton}
            >
              Enter
            </div>
            <Spacer size={"0.25rem"} />
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
            <div className={styles.iconImages}>
              <Image
                alt="Safe"
                src={safe}
                quality={100}
                height={200}
                width={200}
                priority
              />
            </div>
            <div style={{ fontWeight: "700", whiteSpace: "nowrap" }}>
              crack the safe
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
            <div className={styles.iconImages}>
              <Image
                alt="Open safe"
                src={openSafe}
                quality={100}
                height={250}
                width={250}
                priority
              />
            </div>
            <div className={styles.status}>Claim reward</div>
          </div>
        )}
        {isFound && isChallengeCompleted && isAwardClaimed && (
          <div>
            <div className={styles.iconImages}>
              <Image
                alt="Bear trap"
                src={bearTrap}
                quality={100}
                height={250}
                width={250}
                priority
              />
            </div>
            <div className={styles.machinePartNumber}>Machine part 12</div>
            <div className={styles.machinePartName}>Bear trap</div>
            {awardGems} × <SlDiamond color={"deepskyblue"} size={16} />
          </div>
        )}
        {isAwardClaimed && (
          <ResetHiddenAchievementButton
            refresh={refresh}
            setRefresh={setRefresh}
            isUnLocked={isUnLocked}
            challengeType={"challengeReleaseFlow"}
          />
        )}
        <Spacer />
        {showCelebration && (
          <CelebrateHiddenAwardClaim
            closeModal={closeCelebrationModal}
            windowOnClick={celebrationWindowOnClick}
            awardIcon={
              <div
                className={styles.iconImages + ` ${styles.fadeInDownDelayed}`}
              >
                <Image
                  alt="Bear trap"
                  src={bearTrap}
                  quality={100}
                  height={150}
                  width={150}
                  priority
                />
              </div>
            }
            awardGems={awardGems}
            isGemsClaimed={isGemsClaimed}
            machinePart={12}
            machinePartName={"Bear trap"}
            oldIcon={
              <div className={styles.iconImages + ` ${styles.zoomOut}`}>
                <Image
                  alt="Open safe"
                  src={openSafe}
                  quality={100}
                  height={150}
                  width={150}
                  priority
                />
              </div>
            }
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

export default ChallengeReleaseFlow;
