import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import Spacer from "../components/spacer";
import PageHeading from "../components/pageHeading";
import RightWrongCounters from "../components/rightWrongCounters";
import QuestionDisplay from "../components/questionDisplay";
import AnswerForm from "../components/answerForm";
import AnswerGrid from "../components/answerGrid";
import EndButton from "../components/endButton";
import TablesInPlayGrid from "../components/tablesInPlayGrid";
import {
  focusOnAnswerTextBox,
  setCountersToZero,
  setFirstQuestion,
  resetPreviousQuestionAnswersArray,
  isUserAnswerPassedOrInRange,
  trackAppUsageLoyalty,
  newReturnUsageAwardIfDue,
  isCorrectAnswer,
  incrementAnswerCounter,
  incrementAchCorrectAnswers,
  addAnswerToHistoryInfo,
  newAchCorrectAnswersAwardIfDue,
  awardMasteryGemsIfDue,
  storePreviousQuestionAndAnswer,
  questionNumber,
  setNewQuestion,
} from "../core/gamePlayLogic";
import { GiUnlocking } from "react-icons/gi";
import styles from "../componentStyles/PageHeading.module.css";

const PracticeMode = () => {
  const [userAnswer, setUserAnswer] = useState("");
  // counter to force re-render of child component.
  // needed as sessionStorage state changes cannot achieve this.
  const [reRender, setReRender] = useState(0);

  useEffect(() => {
    focusOnAnswerTextBox();
  }, []);

  const resetGame = (e) => {
    e.preventDefault();
    setCountersToZero();
    setFirstQuestion();
    // trigger counter reset in child component
    setReRender(reRender + 1);
    focusOnAnswerTextBox();
    resetPreviousQuestionAnswersArray();
  };

  const handleChange = (event) => {
    const target = event.target;
    setUserAnswer(target.value);
  };

  const endGame = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("isFinished", true);
      setReRender(reRender + 1);
    }
  };

  const submitAnswer = (e) => {
    e.preventDefault();
    focusOnAnswerTextBox();
    if (isUserAnswerPassedOrInRange(userAnswer)) {
      // trigger counter movement in child component when blank answer
      setReRender(reRender + 1);
      // app loyalty tracking
      const bonusGemDue = trackAppUsageLoyalty();
      newReturnUsageAwardIfDue(bonusGemDue);
      if (isCorrectAnswer(userAnswer)) {
        incrementAnswerCounter("correctCounter");
        incrementAchCorrectAnswers();
        addAnswerToHistoryInfo(true);
        newAchCorrectAnswersAwardIfDue();
        awardMasteryGemsIfDue()
        // // 1. get number of correct answers for table
        // const tableIndex = parseInt(sessionStorage.getItem("currentTable")) - 1;
        // const correctAnswersForTable = getTotalCorrectForTable(tableIndex);
        // // 2. get/create array of mastery goals for table
        // const masteryGoalsForTable = masterySkillLevels[tableIndex];
        // // 3. IF 2 includes 1, get index of goal from array
        // if (masteryGoalsForTable.includes(correctAnswersForTable)) {
        //   const masteryGoalIndex = masteryGoalsForTable.indexOf(
        //     correctAnswersForTable
        //   );
        //   // 4. use 3 to select number of gems to award
        //   const gemsToAward = getNumberOfMasteryGems(masteryGoalIndex);
        //   // 5. get gemCount
        //   const currentGemCount = JSON.parse(localStorage.getItem("gemCount"));
        //   // 6. add 4 to 5
        //   const newGemCount = currentGemCount + gemsToAward;
        //   // 7. save new gemCount
        //   localStorage.setItem("gemCount", newGemCount);
        //   // 8. trigger toast
        //   toast.custom(
        //     <div
        //       onClick={() => toast.dismiss()}
        //       className={styles.masteryToast}
        //     >
        //       <div style={{ fontWeight: "700" }}>NEW MASTERY LEVEL</div>
        //       <div
        //         style={{
        //           color: colours[Math.floor(Math.random() * colours.length)],
        //         }}
        //       >
        //         {tableIndex + 1} times table
        //       </div>
        //       <div>{getMasteryIconAndTitle(masteryGoalIndex)}</div>
        //       <div style={{ fontSize: "1rem" }}>
        //         Win {gemsToAward} ×{" "}
        //         <SlDiamond size={12} color={"deepskyblue"} />
        //       </div>
        //     </div>,
        //     { duration: 5000 }
        //   );
        // }
        // check if on hard level and
        const gt = sessionStorage.getItem("gameType");
        const gameOptions = JSON.parse(
          sessionStorage.getItem(`${gt}GameOptions`)
        );
        // if hidden click treasure is unlocked and challenge not comolete and
        const hiddenAwardClicks = JSON.parse(
          localStorage.getItem("hiddenAwardClicks")
        );
        if (
          gameOptions.difficultyLevel === "Hard" &&
          hiddenAwardClicks.found &&
          !hiddenAwardClicks.challengeCompleted &&
          // use correct counter to check for 20 correct answers
          JSON.parse(sessionStorage.getItem("correctCounter")) === 20
        ) {
          // mark challenge as complete
          const hiddenAwardClicks = JSON.parse(
            localStorage.getItem("hiddenAwardClicks")
          );
          hiddenAwardClicks.challengeCompleted = true;
          localStorage.setItem(
            "hiddenAwardClicks",
            JSON.stringify(hiddenAwardClicks)
          );
          // trigger toast
          toast.custom(
            <div onClick={() => toast.remove()} className={styles.toast}>
              <div> TREASURE CHEST UNLOCKED! </div>
              <div className={styles.treasureChest}>
                <GiUnlocking />
              </div>
              <div> go to achievements</div>
            </div>
          );
        }
      } else {
        incrementAnswerCounter("errorCounter");
        addAnswerToHistoryInfo(false);
      }
      storePreviousQuestionAndAnswer(userAnswer);
      // reset user answer for the form
      setUserAnswer("");
      // end game if necessary or set new question
      const gt = sessionStorage.getItem("gameType");
      const gameOptions = JSON.parse(
        sessionStorage.getItem(`${gt}GameOptions`)
      );
      if (questionNumber() > gameOptions.numOfQuestions) {
        endGame();
      } else {
        setNewQuestion();
      }
    } else {
      toast.error("Your answer must be between 1 and 144", {
        id: "outOfRange",
      });
    }
  };

  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"Practice Mode"} />
      <TablesInPlayGrid />
      <RightWrongCounters resetGame={resetGame} reRender={reRender} />
      <QuestionDisplay questionNumber={questionNumber()} />
      <AnswerForm
        userAnswer={userAnswer}
        handleChange={handleChange}
        submitAnswer={submitAnswer}
        resetGame={resetGame}
        destination={"results"}
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

export default PracticeMode;
