import toast from "react-hot-toast";
import Image from "next/image";
import openSafe from "../public/openSafe2.png";
import {
  returnUserGoals,
  correctAnswerGoals,
} from "../config/achievementGoals";
import { masterySkillLevels } from "../config/masteryGoals";
import { getTotalCorrectForTable } from "../core/masteryLogic";
import { getNumberOfMasteryGems } from "../utils/getNumberOfMasteryGems";
import { getMasteryIconAndTitle } from "../utils/getMasteryIconAndTitle";
import colours from "../config/colours";
import { SlDiamond } from "react-icons/sl";
import { TbCalendarStats } from "react-icons/tb";
import { FiAward } from "react-icons/fi";
import styles from "../componentStyles/CustomToast.module.css";
import { GiUnlocking } from "react-icons/gi";

export const focusOnAnswerTextBox = () => {
  if (document.getElementById("answer")) {
    document.getElementById("answer").focus();
  }
};

export const setCountersToZero = () => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("isFinished", false);
    sessionStorage.setItem("correctCounter", 0);
    sessionStorage.setItem("errorCounter", 0);
  }
};

export const setFirstQuestion = () => {
  if (typeof window !== "undefined") {
    const gt = sessionStorage.getItem("gameType");
    const gameOptions = JSON.parse(sessionStorage.getItem(`${gt}GameOptions`));
    if (gameOptions.questionOrdering === "in order") {
      sessionStorage.setItem(
        "currentTable",
        gameOptions.orderedSelectedTables[0]
      );
      sessionStorage.setItem("currentMultiplier", 1);
    } else {
      const shuffledTables = gameOptions.orderedSelectedTables.sort(
        () => 0.5 - Math.random()
      );
      sessionStorage.setItem("currentTable", shuffledTables.slice(0, 1));
      const randomMultiplier = Math.floor(Math.random() * 12) + 1;
      sessionStorage.setItem("currentMultiplier", randomMultiplier);
    }
  }
};

export const resetPreviousQuestionAnswersArray = () => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("prevQuestionAnswersArray", "[]");
  }
};

export const isUserAnswerPassedOrInRange = (userAnswer) => {
  return (
    (parseInt(userAnswer) > 0 && parseInt(userAnswer) < 145) || !userAnswer
  );
};

export const isUserAnswerInRange = (userAnswer) => {
  return parseInt(userAnswer) > 0 && parseInt(userAnswer) < 145;
};

export const isCorrectAnswer = (userAnswer) => {
  const table = parseInt(sessionStorage.getItem("currentTable"));
  const multiplier = parseInt(sessionStorage.getItem("currentMultiplier"));
  if (table * multiplier === parseInt(userAnswer)) {
    return true;
  }
  return false;
};

export const incrementAnswerCounter = (counter) => {
  const currentCount = sessionStorage.getItem(counter);
  sessionStorage.setItem(counter, parseInt(currentCount) + 1);
};

export const incrementAchCorrectAnswers = () => {
  const currentGlobalCount = parseInt(
    localStorage.getItem("achCorrectAnswers")
  );
  localStorage.setItem("achCorrectAnswers", currentGlobalCount + 1);
};

export const addAnswerToHistoryInfo = (isCorrect) => {
  const historyInfo = JSON.parse(localStorage.getItem("historyInfo"));
  const tableIndex = parseInt(sessionStorage.getItem("currentTable")) - 1;
  const multiplierIndex = parseInt(
    sessionStorage.getItem("currentMultiplier") - 1
  );
  const todaysDate = new Date().toISOString().split("T")[0];
  historyInfo[tableIndex][multiplierIndex].push([isCorrect, todaysDate]);
  localStorage.setItem("historyInfo", JSON.stringify(historyInfo));
};

const getAtcaToastMessage = (goals, index, currentGlobalCount) => {
  if (goals[index + 1]) {
    return `NEW AWARD!!!\nClaim your award for getting ${currentGlobalCount} questions correct! \n Next target\n${
      goals[index + 1]
    }`;
  }
  return `NEW AWARD!!!\nClaim your award for getting ${currentGlobalCount} questions correct!`;
};

const getReturnUserToastMessage = (goals, index, currentStreakCount) => {
  if (goals[index + 1]) {
    return `NEW AWARD!!!\nClaim your award for using number cruncher ${currentStreakCount} days in a row! \n Next target\n${
      goals[index + 1]
    }`;
  }
  return `NEW AWARD!!!\nClaim your award for using number cruncher ${currentStreakCount} days in a row!`;
};

export const newAchCorrectAnswersAwardIfDue = () => {
  const currentGlobalCount = parseInt(
    localStorage.getItem("achCorrectAnswers")
  );
  if (correctAnswerGoals.includes(currentGlobalCount)) {
    const index = correctAnswerGoals.indexOf(currentGlobalCount);
    const isATCAClaimedArray = JSON.parse(
      localStorage.getItem("isATCAClaimed")
    );
    isATCAClaimedArray[index] = 0;
    localStorage.setItem("isATCAClaimed", JSON.stringify(isATCAClaimedArray));
    toast.success(
      getAtcaToastMessage(correctAnswerGoals, index, currentGlobalCount),
      {
        id: "correctAnswersAchievement",
      }
    );
  }
};

export const awardMasteryGemsIfDue = () => {
  // 1. get number of correct answers for table
  const tableIndex = parseInt(sessionStorage.getItem("currentTable")) - 1;
  const correctAnswersForTable = getTotalCorrectForTable(tableIndex);
  // 2. get/create array of mastery goals for table
  const masteryGoalsForTable = masterySkillLevels[tableIndex];
  // 3. IF 2 includes 1, get index of goal from array
  if (masteryGoalsForTable.includes(correctAnswersForTable)) {
    const masteryGoalIndex = masteryGoalsForTable.indexOf(
      correctAnswersForTable
    );
    // 4. use 3 to select number of gems to award
    const gemsToAward = getNumberOfMasteryGems(masteryGoalIndex);
    // 5. get gemCount
    const currentGemCount = JSON.parse(localStorage.getItem("gemCount"));
    // 6. add 4 to 5
    const newGemCount = currentGemCount + gemsToAward;
    // 7. save new gemCount
    localStorage.setItem("gemCount", newGemCount);
    // 8. trigger toast
    toast.custom(
      <div onClick={() => toast.dismiss()} className={styles.masteryToast}>
        <div style={{ fontWeight: "700" }}>NEW MASTERY LEVEL</div>
        <div
          style={{
            color: colours[Math.floor(Math.random() * colours.length)],
          }}
        >
          {tableIndex + 1} times table
        </div>
        <div>{getMasteryIconAndTitle(masteryGoalIndex)}</div>
        <div style={{ fontSize: "1rem" }}>
          Win {gemsToAward} × <SlDiamond size={12} color={"deepskyblue"} />
        </div>
      </div>,
      { duration: 5000 }
    );
  }
};

export const completeHiddenAwardClicksChallenge = () => {
  // check if on easy level and
  const gt = sessionStorage.getItem("gameType");
  const gameOptions = JSON.parse(sessionStorage.getItem(`${gt}GameOptions`));
  // if hidden click treasure is unlocked and challenge not complete and
  const hiddenAwardClicks = JSON.parse(
    localStorage.getItem("hiddenAwardClicks")
  );
  if (
    gameOptions.difficultyLevel === "Easy" &&
    hiddenAwardClicks.found &&
    !hiddenAwardClicks.challengeCompleted &&
    // use correct counter to check for 30 correct answers
    JSON.parse(sessionStorage.getItem("correctCounter")) === 30
  ) {
    // mark challenge as complete
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
        <div> go to challenges </div>
      </div>,
      { duration: 4000 }
    );
  }
};

export const completeChallengeReleaseFlowChallenge = () => {
  // check if on medium level and
  const gt = sessionStorage.getItem("gameType");
  const gameOptions = JSON.parse(sessionStorage.getItem(`${gt}GameOptions`));
  // if release flow challenge is unlocked and challenge not complete and
  const challengeReleaseFlow = JSON.parse(
    localStorage.getItem("challengeReleaseFlow")
  );
  if (
    gameOptions.difficultyLevel === "Medium" &&
    challengeReleaseFlow.found &&
    !challengeReleaseFlow.challengeCompleted &&
    // use correct counter to check for 30 correct answers
    JSON.parse(sessionStorage.getItem("correctCounter")) === 50
  ) {
    // mark challenge as complete
    challengeReleaseFlow.challengeCompleted = true;
    localStorage.setItem(
      "challengeReleaseFlow",
      JSON.stringify(challengeReleaseFlow)
    );
    // trigger toast
    toast.custom(
      <div onClick={() => toast.remove()} className={styles.toast}>
        <div> SAFE CRACKED AND OPEN! </div>
        <div className={styles.openSafe}>
          <Image
            alt="Open safe"
            src={openSafe}
            quality={100}
            height={200}
            width={200}
            priority
          />
        </div>
        <div> go to challenges </div>
      </div>,
      { duration: 4000 }
    );
  }
};

export const newAchStreakAwardIfDue = (level) => {};

export const trackAppUsageLoyalty = () => {
  const returnUsage = JSON.parse(localStorage.getItem("returnUsage"));
  const todayFull = new Date();
  const yesterdayInMS = todayFull.setDate(todayFull.getDate() - 1);
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(yesterdayInMS).toISOString().split("T")[0];
  const returnUsageDate = returnUsage[0];
  const bonusGemDate = localStorage.getItem("dailyBonusGemDate");

  if (returnUsageDate === today) {
    // do nothing - user has already played today
    console.log("DOING NOTHING");
  } else {
    if (returnUsageDate === yesterday) {
      // increment returnUsage count
      returnUsage[1] = returnUsage[1] + 1;
      // check if new best and save
      if (returnUsage[2] < returnUsage[1]) {
        returnUsage[2] = returnUsage[1];
      }
    } else {
      // check if first time playing and increment all time best
      if (returnUsage[2] === 0) {
        returnUsage[2] = 1;
      }
      // set returnUsage count to 1
      returnUsage[1] = 1;
    }
    // set today's date
    returnUsage[0] = today;
    // save new returnUsage
    localStorage.setItem("returnUsage", JSON.stringify(returnUsage));
    // increment gem count by one if not already claimed
    if (bonusGemDate !== today) {
      var gemCount = parseInt(localStorage.getItem("gemCount"));
      gemCount = gemCount + 1;
      localStorage.setItem("gemCount", gemCount);
    }
    // update user on current streak if no award due
    const currentStreak = JSON.parse(localStorage.getItem("returnUsage"))[1];
    const index = returnUserGoals.indexOf(currentStreak);
    if (
      !returnUserGoals.includes(currentStreak) ||
      (index >= 0 &&
        JSON.parse(localStorage.getItem("isReturnUsageClaimed"))[index] !==
          false)
    ) {
      toast.custom(
        <div onClick={() => toast.remove()} className={styles.toast}>
          <TbCalendarStats color="white" size="50px" />
          <div> Days used in a row </div>
          <div>{JSON.parse(localStorage.getItem("returnUsage"))[1]}</div>
          {bonusGemDate !== today && (
            <div className={styles.gem}>
              1 ×&nbsp;
              <SlDiamond color={"deepSkyBlue"} size="20px" />
            </div>
          )}
        </div>,
        { duration: 3000 }
      );
    }
    localStorage.setItem("dailyBonusGemDate", today);
  }
  return bonusGemDate !== today;
};

export const newReturnUsageAwardIfDue = (bonusGemDue) => {
  if (
    returnUserGoals.includes(JSON.parse(localStorage.getItem("returnUsage"))[1])
  ) {
    const index = returnUserGoals.indexOf(
      JSON.parse(localStorage.getItem("returnUsage"))[1]
    );
    if (
      JSON.parse(localStorage.getItem("isReturnUsageClaimed"))[index] === false
    ) {
      const arr = JSON.parse(localStorage.getItem("isReturnUsageClaimed"));
      arr[index] = 0;
      localStorage.setItem("isReturnUsageClaimed", JSON.stringify(arr));
      toast.custom(
        <div onClick={() => toast.remove()} className={styles.returnUserToast}>
          <FiAward color="gold" size="50px" />
          {getReturnUserToastMessage(
            returnUserGoals,
            index,
            JSON.parse(localStorage.getItem("returnUsage"))[1]
          )}
          {bonusGemDue && (
            <div className={styles.gem}>
              1 ×&nbsp;
              <SlDiamond color={"deepSkyBlue"} size="20px" />
            </div>
          )}
        </div>,
        { duration: 5000 }
      );
    }
  }
};

export const storePreviousQuestionAndAnswer = (userAnswer) => {
  const qAArray = JSON.parse(
    sessionStorage.getItem("prevQuestionAnswersArray")
  );
  const qAObject = {
    id: questionNumber() - 1,
    table: parseInt(sessionStorage.getItem("currentTable")),
    multiplier: parseInt(sessionStorage.getItem("currentMultiplier")),
    userAnswer: getUserAnswer(userAnswer),
    isCorrect: isCorrectAnswer(userAnswer),
  };
  qAArray.push(qAObject);
  const stringifiedQAArray = JSON.stringify(qAArray);
  sessionStorage.setItem("prevQuestionAnswersArray", stringifiedQAArray);
};

const getUserAnswer = (userAnswer) => {
  if (userAnswer) {
    return parseInt(userAnswer);
  }
  return "--";
};

export const questionNumber = () => {
  let right;
  let wrong;
  if (typeof window !== "undefined") {
    right = sessionStorage.getItem("correctCounter");
    wrong = sessionStorage.getItem("errorCounter");
  }
  return parseInt(right) + parseInt(wrong) + 1;
};

export const setNewQuestion = () => {
  const gt = sessionStorage.getItem("gameType");
  const gameOptions = JSON.parse(sessionStorage.getItem(`${gt}GameOptions`));

  if (gameOptions.questionOrdering === "mixed up") {
    const shuffledTables = gameOptions.orderedSelectedTables.sort(
      () => 0.5 - Math.random()
    );
    sessionStorage.setItem("currentTable", shuffledTables.slice(0, 1));
    const newMultiplier = Math.floor(Math.random() * 12) + 1;
    sessionStorage.setItem("currentMultiplier", newMultiplier);
  } else {
    if (parseInt(sessionStorage.getItem("currentMultiplier")) < 12) {
      const newMultiplier =
        parseInt(sessionStorage.getItem("currentMultiplier")) + 1;
      sessionStorage.setItem("currentMultiplier", newMultiplier);
    } else {
      var index = gameOptions.orderedSelectedTables.indexOf(
        parseInt(sessionStorage.getItem("currentTable"))
      );
      sessionStorage.setItem(
        "currentTable",
        gameOptions.orderedSelectedTables[index + 1]
      );
      sessionStorage.setItem("currentMultiplier", 1);
    }
  }
};
