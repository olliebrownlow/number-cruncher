import { useEffect, useState } from "react";
import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import PageHeading from "../components/pageHeading";
import SubHeading from "../components/subHeading";
import Spacer from "../components/spacer";
import ResetAchievementButton from "../components/resetAchievementButton";
import CelebrateAwardClaim from "../components/celebrateAwardClaim";
import correctAnswerGoals from "../config/correctAnswerGoals";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { SlBadge } from "react-icons/sl";
import { FaAward, FaMedal } from "react-icons/fa";
import { BiMedal } from "react-icons/bi";
import { BsTrophy } from "react-icons/bs";
import { GiTrophy } from "react-icons/gi";
import { AiOutlineLock } from "react-icons/ai";
import { GiDiamondTrophy } from "react-icons/gi";
import styles from "../styles/Achievements.module.css";

const Achievements = () => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentGoal, setCurrentGoal] = useState(50);
  const [refresh, setRefresh] = useState(0);
  const [aTCAClaimed, setATCAClaimed] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const numCorrectAnswers = parseInt(
      localStorage.getItem("achCorrectAnswers")
    );
    setCorrectAnswers(numCorrectAnswers);

    const reducer = (numCorrectAnswers) => {
      return function (element) {
        return element > numCorrectAnswers;
      };
    };
    const reducedGoals = correctAnswerGoals.filter(reducer(numCorrectAnswers));
    setCurrentGoal(reducedGoals[0]);
    const isATCAClaimed = JSON.parse(localStorage.getItem("isATCAClaimed"));
    setATCAClaimed(isATCAClaimed);
  }, [refresh]);

  const getPercent = () => {
    return (correctAnswers / currentGoal) * 100;
  };

  const claimAward = (index) => {
    setShowCelebration(true);
    const isATCAClaimedArray = JSON.parse(
      localStorage.getItem("isATCAClaimed")
    );
    isATCAClaimedArray[index] = true;
    localStorage.setItem("isATCAClaimed", JSON.stringify(isATCAClaimedArray));
    setIndex(index);
    setATCAClaimed(isATCAClaimedArray);
  };

  const closeCelebrationModal = () => {
    setShowCelebration(false);
  };

  // close modal from window surrounding the modal itself
  const celebrationWindowOnClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowCelebration(false);
    }
  };

  const getColour = (health) => {
    switch (true) {
      case health >= 95:
        return "#008000";
      case health >= 86:
        return "#469200";
      case health >= 77:
        return "#71a300";
      case health >= 68:
        return "#9ab400";
      case health >= 59:
        return "#c4c400";
      case health >= 50:
        return "#d8bf00";
      case health >= 41:
        return "#ecba00";
      case health >= 32:
        return "#ffb300";
      case health >= 23:
        return "#ff9700";
      case health >= 14:
        return "#ff7700";
      case health >= 5:
        return "#ff5100";
      default:
        return "#ff0000";
    }
  };

  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"Achievements"} />
      <SubHeading subheading={"All-time correct answers"} position={"center"} />
      <Spacer size={"0.5rem"} />
      <SubHeading subheading={"Your awards"} position={"left"} />
      <Spacer size={"0.5rem"} />
      <div className={styles.awardGrid}>
        {currentGoal <= correctAnswerGoals[0] ? (
          <div
            className={styles.award1}
            style={{
              fontSize: "1.5rem",
            }}
          >
            <AiOutlineLock />
            <div className={styles.target1}>{correctAnswerGoals[0]}</div>
          </div>
        ) : aTCAClaimed[0] === 0 ? (
          <div
            className={styles.award1}
            style={{
              fontSize: "1.5rem",
            }}
            onClick={() => claimAward(0)}
          >
            <AiOutlineLock />
            <div className={styles.claim}>claim</div>
          </div>
        ) : (
          <div>
            <SlBadge
              className={styles.award1}
              style={{
                fontSize: "1.5rem",
              }}
            />
            <div className={styles.target1}>{correctAnswerGoals[0]}</div>
          </div>
        )}
        {currentGoal <= correctAnswerGoals[1] ? (
          <div
            className={styles.award1}
            style={{
              fontSize: "1.75rem",
            }}
          >
            <AiOutlineLock />
            <div className={styles.target1}>{correctAnswerGoals[1]}</div>
          </div>
        ) : aTCAClaimed[1] === 0 ? (
          <div
            className={styles.award1}
            style={{
              fontSize: "1.75rem",
            }}
            onClick={() => claimAward(1)}
          >
            <AiOutlineLock />
            <div className={styles.claim}>claim</div>
          </div>
        ) : (
          <div>
            <FaAward
              className={styles.award1}
              style={{
                fontSize: "1.75rem",
              }}
            />
            <div className={styles.target1}>{correctAnswerGoals[1]}</div>
          </div>
        )}
        {currentGoal <= correctAnswerGoals[2] ? (
          <div
            className={styles.award2}
            style={{
              fontSize: "2rem",
            }}
          >
            <AiOutlineLock />
            <div className={styles.target2}>{correctAnswerGoals[2]}</div>
          </div>
        ) : aTCAClaimed[2] === 0 ? (
          <div
            className={styles.award2}
            style={{
              fontSize: "2rem",
            }}
            onClick={() => claimAward(2)}
          >
            <AiOutlineLock />
            <div className={styles.claim}>claim</div>
          </div>
        ) : (
          <div>
            <BiMedal
              className={styles.award2}
              style={{
                fontSize: "2.4rem",
              }}
            />
            <div className={styles.target2}>{correctAnswerGoals[2]}</div>
          </div>
        )}
        {currentGoal <= correctAnswerGoals[3] ? (
          <div
            className={styles.award2}
            style={{
              fontSize: "2.25rem",
            }}
          >
            <AiOutlineLock />
            <div className={styles.target2}>{correctAnswerGoals[3]}</div>
          </div>
        ) : aTCAClaimed[3] === 0 ? (
          <div
            className={styles.award2}
            style={{
              fontSize: "2.25rem",
            }}
            onClick={() => claimAward(3)}
          >
            <AiOutlineLock />
            <div className={styles.claim}>claim</div>
          </div>
        ) : (
          <div>
            <FaMedal
              className={styles.award2}
              style={{
                fontSize: "2.5rem",
              }}
            />
            <div className={styles.target2}>{correctAnswerGoals[3]}</div>
          </div>
        )}
        {currentGoal <= correctAnswerGoals[4] ? (
          <div
            className={styles.award3}
            style={{
              fontSize: "2.5rem",
            }}
          >
            <AiOutlineLock />
            <div className={styles.target3}>{correctAnswerGoals[4]}</div>
          </div>
        ) : aTCAClaimed[4] === 0 ? (
          <div
            className={styles.award3}
            style={{
              fontSize: "2.5rem",
            }}
            onClick={() => claimAward(4)}
          >
            <AiOutlineLock />
            <div className={styles.claim}>claim</div>
          </div>
        ) : (
          <div>
            <BsTrophy
              className={styles.award3}
              style={{
                fontSize: "3rem",
              }}
            />
            <div className={styles.target2}>{correctAnswerGoals[4]}</div>
          </div>
        )}
        {currentGoal <= correctAnswerGoals[5] ? (
          <div
            className={styles.award3}
            style={{
              fontSize: "2.75rem",
            }}
          >
            <AiOutlineLock />
            <div className={styles.target3}>{correctAnswerGoals[5]}</div>
          </div>
        ) : aTCAClaimed[5] === 0 ? (
          <div
            className={styles.award3}
            style={{
              fontSize: "2.75rem",
            }}
            onClick={() => claimAward(5)}
          >
            <AiOutlineLock />
            <div className={styles.claim}>claim</div>
          </div>
        ) : (
          <div>
            <GiTrophy
              className={styles.award3}
              style={{
                fontSize: "3.75rem",
              }}
            />
            <div className={styles.target3}>{correctAnswerGoals[5]}</div>
          </div>
        )}
      </div>
      <Spacer size={"1rem"} />
      {currentGoal <= correctAnswerGoals[6] ? (
        <>
          <div
            className={styles.award3}
            style={{
              fontSize: "6.5rem",
            }}
          >
            <AiOutlineLock />
            <div className={styles.target3}>{correctAnswerGoals[6]}</div>
          </div>
        </>
      ) : aTCAClaimed[6] === 0 ? (
        <div
          className={styles.award3}
          style={{
            fontSize: "6.5rem",
          }}
          onClick={() => claimAward(6)}
        >
          <AiOutlineLock />
          <div className={styles.mainClaim}>claim</div>
        </div>
      ) : (
        <>
          <GiDiamondTrophy
            className={styles.award3}
            style={{
              fontSize: "6.5rem",
            }}
          />
          <div className={styles.target3}>{correctAnswerGoals[6]}</div>
        </>
      )}
      {correctAnswers >= correctAnswerGoals[6] ? (
        <>
          <Spacer />
          <div className={styles.completed}>
            Congratulations, all awards collected and achievement completed!
          </div>
          <Spacer />
          <div className={styles.current}>{correctAnswers}</div>
        </>
      ) : (
        <>
          <Spacer size={"2.5rem"} />
          <div className={styles.container}>
            <ProgressBar
              filledBackground={getColour(getPercent())}
              percent={getPercent()}
            >
              <Step>{() => <div></div>}</Step>
              <Step>
                {() => <div className={styles.standing}>{correctAnswers}</div>}
              </Step>
              <Step>
                {() => (
                  <div className={styles.indexedStep}>
                    <div className={styles.label}>{currentGoal}</div>
                  </div>
                )}
              </Step>
            </ProgressBar>
          </div>
        </>
      )}
      <Spacer size={"0.5rem"} />
      <ResetAchievementButton
        achType={"achCorrectAnswers"}
        refresh={refresh}
        setRefresh={setRefresh}
        setATCAClaimed={setATCAClaimed}
      />
      <Spacer />
      {showCelebration && (
        <CelebrateAwardClaim
          closeModal={closeCelebrationModal}
          windowOnClick={celebrationWindowOnClick}
          index={index}
        />
      )}
    </>
  );
};

export default Achievements;
