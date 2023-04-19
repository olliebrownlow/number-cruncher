import { useState, useEffect } from "react";
import toast from "react-hot-toast";
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
  isUserAnswerInRange,
  trackAppUsageLoyalty,
  newReturnUsageAwardIfDue,
  isCorrectAnswer,
  incrementAnswerCounter,
  incrementAchCorrectAnswers,
  addAnswerToHistoryInfo,
  newAchCorrectAnswersAwardIfDue,
  // newAchStreakAwardIfDue,
  storePreviousQuestionAndAnswer,
  questionNumber,
  setNewQuestion,
} from "../core/gamePlayLogic";
import {
  returnUserGoals,
  streakEasyGoals,
  streakMediumGoals,
  streakHardGoals,
} from "../config/achievementGoals";

const Streak = () => {
  const [userAnswer, setUserAnswer] = useState("");
  const [level, setLevel] = useState("Other");
  const [goals, setGoals] = useState(undefined);
  const [gameStartBest, setGameStartBest] = useState(0);
  const [reRender, setReRender] = useState(0);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    focusOnAnswerTextBox();

    const getLevelGoals = (level) => {
      switch (level) {
        case "Easy":
          return streakEasyGoals;
        case "Medium":
          return streakMediumGoals;
        case "Hard":
          return streakHardGoals;
        default:
          return undefined;
      }
    };

    const gt = sessionStorage.getItem("gameType");
    const gameOptions = JSON.parse(sessionStorage.getItem(`${gt}GameOptions`));
    setLevel(gameOptions.difficultyLevel);
    setGoals(getLevelGoals(gameOptions.difficultyLevel));
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
        // push new streak
        bestStreaksByDifficulty[bestStreakReserve.level].push(
          bestStreakReserve.streak
        );
        // order descending
        bestStreaksByDifficulty[bestStreakReserve.level].sort(function (a, b) {
          return b - a;
        });
        // remove lowest
        bestStreaksByDifficulty[bestStreakReserve.level].pop();
        // resave back to local storage
        localStorage.setItem(
          "bestStreaksByDifficulty",
          JSON.stringify(bestStreaksByDifficulty)
        );
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

  const getLevelAchievementClaimedArray = () => {
    switch (level) {
      case "Easy":
        return JSON.parse(localStorage.getItem("isStreakEasyClaimed"));
      case "Medium":
        return JSON.parse(localStorage.getItem("isStreakMediumClaimed"));
      case "Hard":
        return JSON.parse(localStorage.getItem("isStreakHardClaimed"));
      default:
        return undefined;
    }
  };

  const submitAnswer = (e) => {
    e.preventDefault();
    focusOnAnswerTextBox();
    if (isUserAnswerInRange(userAnswer)) {
      // trigger counter movement in child component when blank answer
      setReRender(reRender + 1);
      // app loyalty tracking
      trackAppUsageLoyalty();
      newReturnUsageAwardIfDue();
      // if (
      //   returnUserGoals.includes(
      //     JSON.parse(localStorage.getItem("returnUsage"))[1]
      //   )
      // ) {
      //   const index = returnUserGoals.indexOf(
      //     JSON.parse(localStorage.getItem("returnUsage"))[1]
      //   );
      //   if (
      //     JSON.parse(localStorage.getItem("isReturnUsageClaimed"))[index] ===
      //     false
      //   ) {
      //     const arr = JSON.parse(localStorage.getItem("isReturnUsageClaimed"));
      //     arr[index] = 0;
      //     localStorage.setItem("isReturnUsageClaimed", JSON.stringify(arr));
      //     toast.success(
      //       getReturnUserToastMessage(
      //         returnUserGoals,
      //         index,
      //         JSON.parse(localStorage.getItem("returnUsage"))[1]
      //       ),
      //       {
      //         id: "returnUsageAchievementInStreak",
      //       }
      //     );
      //   }
      // }

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
        // newAchStreakAwardIfDue();
        if (
          goals &&
          goals.includes(JSON.parse(sessionStorage.getItem("correctCounter")))
        ) {
          const index = goals.indexOf(
            JSON.parse(sessionStorage.getItem("correctCounter"))
          );
          if (getLevelAchievementClaimedArray()[index] === false) {
            if (level === "Easy") {
              const arr = JSON.parse(
                localStorage.getItem("isStreakEasyClaimed")
              );
              arr[index] = 0;
              localStorage.setItem("isStreakEasyClaimed", JSON.stringify(arr));
            }
            if (level === "Medium") {
              const arr = JSON.parse(
                localStorage.getItem("isStreakMediumClaimed")
              );
              arr[index] = 0;
              localStorage.setItem(
                "isStreakMediumClaimed",
                JSON.stringify(arr)
              );
            }
            if (level === "Hard") {
              const arr = JSON.parse(
                localStorage.getItem("isStreakHardClaimed")
              );
              arr[index] = 0;
              localStorage.setItem("isStreakHardClaimed", JSON.stringify(arr));
            }
            toast.success(
              getToastMessage(
                goals,
                index,
                JSON.parse(sessionStorage.getItem("correctCounter"))
              ),
              {
                id: "streakAchievement",
              }
            );
          }
        }
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

  const getToastMessage = (goals, index, currentStreakCount) => {
    if (goals[index + 1]) {
      return `NEW AWARD!!!\nClaim your award for getting a streak of ${currentStreakCount}! \n Next target\n${
        goals[index + 1]
      }`;
    }
    return `NEW AWARD!!!\nClaim your award for getting a streak of ${currentStreakCount}!`;
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
        destination={"topStreaks"}
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
