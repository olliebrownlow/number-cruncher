import { useState, useEffect } from "react";
import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import PageHeading from "../components/pageHeading";
import TablesInPlayGrid from "../components/tablesInPlayGrid";
import QuestionDisplay from "../components/questionDisplay";
import AnswerForm from "../components/answerForm";
import AnswerGrid from "../components/answerGrid";
import EndButton from "../components/endButton";
import Spacer from "../components/spacer";
import { getColour } from "../utils/getColour";
import { getGameEndMessage } from "../utils/getGameEndMessage";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Fireworks } from "@fireworks-js/react";
import styles from "../styles/Streak.module.css";
import {
  focusOnAnswerTextBox,
  setCountersToZero,
  setFirstQuestion,
  resetPreviousQuestionAnswersArray,
  isUserAnswerPassedOrInRange,
  isCorrectAnswer,
  incrementAnswerCounter,
  incrementAchCorrectAnswers,
  addAnswerToHistoryInfo,
  newAchCorrectAnswersAwardIfDue,
  storePreviousQuestionAndAnswer,
  questionNumber,
  setNewQuestion,
} from "../core/gamePlayLogic";

const Streak = () => {
  const [userAnswer, setUserAnswer] = useState("");
  const [level, setLevel] = useState("Other");
  const [gameStartBest, setGameStartBest] = useState(0);
  const [reRender, setReRender] = useState(0);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    focusOnAnswerTextBox();
    const gt = sessionStorage.getItem("gameType");
    const gameOptions = JSON.parse(sessionStorage.getItem(`${gt}GameOptions`));
    setLevel(gameOptions.difficultyLevel);
    const bestStreaksByDifficulty = JSON.parse(
      localStorage.getItem("bestStreaksByDifficulty")
    );
    const bestForThisLevel =
      bestStreaksByDifficulty[gameOptions.difficultyLevel][0];
    setGameStartBest(bestForThisLevel);
  }, []);

  const resetGame = (e) => {
    e.preventDefault();
    setCountersToZero();
    setFirstQuestion();
    // trigger counter reset in child component
    setReRender(reRender + 1);
    focusOnAnswerTextBox();
    resetPreviousQuestionAnswersArray();
    const bestStreaksByDifficulty = JSON.parse(
      localStorage.getItem("bestStreaksByDifficulty")
    );
    const bestForThisLevel = bestStreaksByDifficulty[level][0];
    setGameStartBest(bestForThisLevel);
  };

  const handleChange = (event) => {
    const target = event.target;
    setUserAnswer(target.value);
  };

  const endGame = () => {
    setAnimation(true);
    if (typeof window !== "undefined") {
      // store current best streak for level
      const bestStreaksByDifficulty = JSON.parse(
        localStorage.getItem("bestStreaksByDifficulty")
      );
      const bestStreakForThisLevel = bestStreaksByDifficulty[level][0];
      sessionStorage.setItem(
        "bestStreakForThisLevel",
        JSON.stringify(bestStreakForThisLevel)
      );
      // end game
      sessionStorage.setItem("isFinished", true);
      // check if we have an un-added new top 3 streak and add it if necessary
      const bestStreakReserve = JSON.parse(
        localStorage.getItem("bestStreakReserve")
      );
      if (bestStreakReserve && !bestStreakReserve.added) {
        // const bestStreaksByDifficulty = JSON.parse(
        //   localStorage.getItem("bestStreaksByDifficulty")
        // );
        switch (bestStreakReserve.level) {
          case "Easy":
            // push new streak
            bestStreaksByDifficulty.Easy.push(bestStreakReserve.streak);
            // order descending
            bestStreaksByDifficulty.Easy.sort(function (a, b) {
              return b - a;
            });
            // remove lowest
            bestStreaksByDifficulty.Easy.pop();
            // resave back to local storage
            localStorage.setItem(
              "bestStreaksByDifficulty",
              JSON.stringify(bestStreaksByDifficulty)
            );
            break;
          case "Medium":
            bestStreaksByDifficulty.Medium.push(bestStreakReserve.streak);
            bestStreaksByDifficulty.Medium.sort(function (a, b) {
              return b - a;
            });
            bestStreaksByDifficulty.Medium.pop();
            localStorage.setItem(
              "bestStreaksByDifficulty",
              JSON.stringify(bestStreaksByDifficulty)
            );
            break;
          case "Hard":
            bestStreaksByDifficulty.Hard.push(bestStreakReserve.streak);
            bestStreaksByDifficulty.Hard.sort(function (a, b) {
              return b - a;
            });
            bestStreaksByDifficulty.Hard.pop();
            localStorage.setItem(
              "bestStreaksByDifficulty",
              JSON.stringify(bestStreaksByDifficulty)
            );
            break;
          default:
            bestStreaksByDifficulty.Other.push(bestStreakReserve.streak);
            bestStreaksByDifficulty.Other.sort(function (a, b) {
              return b - a;
            });
            bestStreaksByDifficulty.Other.pop();
            localStorage.setItem(
              "bestStreaksByDifficulty",
              JSON.stringify(bestStreaksByDifficulty)
            );
        }
        // mark streak as added
        bestStreakReserve.added = true;
        localStorage.setItem(
          "bestStreakReserve",
          JSON.stringify(bestStreakReserve)
        );
      }
      setReRender(reRender + 1);
    }
  };

  const submitAnswer = (e) => {
    e.preventDefault();
    focusOnAnswerTextBox();
    if (isUserAnswerPassedOrInRange(userAnswer)) {
      // trigger counter movement in child component when blank answer
      setReRender(reRender + 1);
      if (isCorrectAnswer(userAnswer)) {
        incrementAnswerCounter("correctCounter");
        // reserve best for addition to best streaks later
        if (
          JSON.parse(sessionStorage.getItem("correctCounter")) >
          getBestStreakForLevel("Third")
        ) {
          const bestStreakReserve = {
            streak: JSON.parse(sessionStorage.getItem("correctCounter")),
            level: level,
            added: false,
          };
          localStorage.setItem(
            "bestStreakReserve",
            JSON.stringify(bestStreakReserve)
          );
        }
        incrementAchCorrectAnswers();
        addAnswerToHistoryInfo(true);
        newAchCorrectAnswersAwardIfDue();
        storePreviousQuestionAndAnswer(userAnswer);
        setNewQuestion();
      } else {
        addAnswerToHistoryInfo(false);
        storePreviousQuestionAndAnswer(userAnswer);
        endGame();
      }
      // reset user answer for the form
      setUserAnswer("");
    } else {
      toast.error("Your answer must be between 1 and 144", {
        id: "outOfRange",
      });
    }
  };

  const getCorrectAnswerCount = () => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("correctCounter");
    }
  };

  const getBestStreakForLevel = (rank) => {
    if (typeof window !== "undefined") {
      const allStreaks = JSON.parse(
        localStorage.getItem("bestStreaksByDifficulty")
      );
      switch (level + rank) {
        case "EasyFirst":
          return allStreaks.Easy[0];
        case "EasySecond":
          return allStreaks.Easy[1];
        case "EasyThird":
          return allStreaks.Easy[2];
        case "MediumFirst":
          return allStreaks.Medium[0];
        case "MediumSecond":
          return allStreaks.Medium[1];
        case "MediumThird":
          return allStreaks.Medium[2];
        case "HardFirst":
          return allStreaks.Hard[0];
        case "HardSecond":
          return allStreaks.Hard[1];
        case "HardThird":
          return allStreaks.Hard[2];
        case "OtherFirst":
          return allStreaks.Other[0];
        case "OtherSecond":
          return allStreaks.Other[1];
        case "OtherThird":
          return allStreaks.Other[2];
        default:
          return 0;
      }
    }
  };

  const getPercentageOfBest = () => {
    return (getCorrectAnswerCount() / gameStartBest) * 100;
  };

  const stopAnimation = () => {
    setAnimation(false);
  };

  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"Streak Challenge"} />
      {level !== "Other" && (
        <div className={styles.level}>
          Difficulty level: {level}
          <Spacer />
        </div>
      )}
      <TablesInPlayGrid />
      {typeof window !== "undefined" &&
        !JSON.parse(sessionStorage.getItem("isFinished")) && (
          <>
            {gameStartBest === 0 ? (
              <>
                <Spacer size={"0.5rem"} />
                <div className={styles.newBest}>Set your first streak</div>
                <div className={styles.newBestStreak}>
                  {getCorrectAnswerCount()}
                </div>
              </>
            ) : (
              <>
                {getCorrectAnswerCount() > gameStartBest ? (
                  <>
                    <Spacer size={"0.3rem"} />
                    <div className={styles.newBest}>New Best!!!</div>
                    <div className={styles.newBestStreak}>
                      {getCorrectAnswerCount()}
                    </div>
                  </>
                ) : (
                  <>
                    <Spacer size={"2rem"} />
                    <div className={styles.streakBarContainer}>
                      <ProgressBar
                        percent={getPercentageOfBest()}
                        filledBackground={getColour(getPercentageOfBest())}
                      >
                        <Step>
                          {() => <div className={styles.firstStep}></div>}
                        </Step>
                        <Step>
                          {() => (
                            <>
                              <div className={styles.label}>Streak</div>
                              <div className={styles.standing}>
                                {getCorrectAnswerCount()}
                              </div>
                            </>
                          )}
                        </Step>
                        <Step>
                          {() => (
                            <div className={styles.indexedStep}>
                              <div className={styles.label}>Best</div>
                              <div className={styles.standing}>
                                {gameStartBest}
                              </div>
                            </div>
                          )}
                        </Step>
                      </ProgressBar>
                    </div>
                    <Spacer />
                  </>
                )}
              </>
            )}
          </>
        )}
      {typeof window !== "undefined" &&
        JSON.parse(sessionStorage.getItem("isFinished")) && (
          <>
            <Spacer />
            {getCorrectAnswerCount() >
            parseInt(sessionStorage.getItem("bestStreakForThisLevel")) ? (
              <>
                {animation && (
                  <Fireworks
                    options={{
                      rocketsPoint: {
                        min: 50,
                        max: 50,
                      },
                    }}
                    style={{
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      position: "fixed",
                      background: "#000",
                    }}
                    onClick={() => stopAnimation()}
                  />
                )}
                <div className={styles.newBest}>{getGameEndMessage(101)}</div>
                <div className={styles.newBest}>NEW BEST STREAK!!</div>
                {animation && (
                  <div
                    className={
                      styles.newFinalBestStreak + ` ${styles.backOutDown}`
                    }
                  >
                    {parseInt(sessionStorage.getItem("bestStreakForThisLevel"))}
                  </div>
                )}
                <div
                  className={
                    animation
                      ? styles.newFinalBestStreak + ` ${styles.bounceInUp}`
                      : styles.newFinalBestStreak
                  }
                >
                  {getCorrectAnswerCount()}
                </div>
              </>
            ) : (
              <>
                <div className={styles.newBest}>
                  {getGameEndMessage(getPercentageOfBest())}
                </div>
                <div className={styles.newFinalBestStreak}>
                  {getCorrectAnswerCount()}
                </div>
              </>
            )}
          </>
        )}
      <QuestionDisplay questionNumber={questionNumber()} />
      <AnswerForm
        userAnswer={userAnswer}
        handleChange={handleChange}
        submitAnswer={submitAnswer}
        resetGame={resetGame}
      />
      <AnswerGrid />
      <Spacer />
      {typeof window !== "undefined" &&
        sessionStorage.getItem("isFinished") === "false" && (
          <>
            <EndButton endGame={endGame} />
            <Spacer />
          </>
        )}
    </>
  );
};

export default Streak;
