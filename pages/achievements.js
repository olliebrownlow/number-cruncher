import { useEffect, useState } from "react";
import Image from "next/image";
import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import PageHeading from "../components/pageHeading";
import SubHeading from "../components/subHeading";
import Spacer from "../components/spacer";
import ResetAchievementButton from "../components/resetAchievementButton";
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
import cardChalkboard from "../public/cardChalkboard.jpg";
import styles from "../styles/Achievements.module.css";

const Achievements = () => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentGoal, setCurrentGoal] = useState(50);
  const [refresh, setRefresh] = useState(0);

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
  }, [refresh]);

  const getPercent = () => {
    return (correctAnswers / currentGoal) * 100;
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
      {/* <div className={styles.bgWrap}>
        <Image
          alt="chalkboard"
          src={cardChalkboard}
          quality={100}
          fill
          priority
        />
      </div> */}
      <div className={styles.awardGrid}>
        {currentGoal <= correctAnswerGoals[0] ? (
          <div
            className={styles.award1}
            style={{
              fontSize: "1.5rem",
            }}
          >
            <AiOutlineLock />
          </div>
        ) : (
          <div>
            <SlBadge
              className={styles.award1}
              style={{
                fontSize: "1.5rem",
              }}
            />
            <div>{correctAnswerGoals[0]}</div>
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
          </div>
        ) : (
          <div>
            <FaAward
              className={styles.award1}
              style={{
                fontSize: "1.75rem",
              }}
            />
            <div>{correctAnswerGoals[1]}</div>
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
          </div>
        ) : (
          <div>
            <BiMedal
              className={styles.award2}
              style={{
                fontSize: "2.4rem",
              }}
            />
            <div>{correctAnswerGoals[2]}</div>
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
          </div>
        ) : (
          <div>
            <FaMedal
              className={styles.award2}
              style={{
                fontSize: "2.5rem",
              }}
            />
            <div>{correctAnswerGoals[3]}</div>
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
          </div>
        ) : (
          <div>
            <BsTrophy
              className={styles.award3}
              style={{
                fontSize: "3rem",
              }}
            />
            <div>{correctAnswerGoals[4]}</div>
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
          </div>
        ) : (
          <div>
            <GiTrophy
              className={styles.award3}
              style={{
                fontSize: "3.75rem",
              }}
            />
            <div>{correctAnswerGoals[5]}</div>
          </div>
        )}
      </div>
      <Spacer size={"1rem"} />
      {currentGoal <= correctAnswerGoals[6] ? (
        <div
          className={styles.award3}
          style={{
            fontSize: "6.5rem",
          }}
        >
          <AiOutlineLock />
        </div>
      ) : (
        <>
          <GiDiamondTrophy
            className={styles.award3}
            style={{
              fontSize: "6.5rem",
            }}
          />
          <div>{correctAnswerGoals[6]}</div>
        </>
      )}
      {correctAnswers >= correctAnswerGoals[6] ? (
        <>
          <Spacer />

          <div className={styles.complete}>{correctAnswers}</div>
        </>
      ) : (
        <>
          <Spacer size={"2rem"} />
          <div className={styles.container}>
            <ProgressBar
              filledBackground="linear-gradient(to right, #90EE90, #006400)"
              percent={getPercent()}
            >
              <Step>{() => <div className={styles.firstStep}></div>}</Step>
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
      <Spacer />
      <ResetAchievementButton
        achType={"achCorrectAnswers"}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <Spacer />
    </>
  );
};

export default Achievements;
