import toast from "react-hot-toast";
import {
  returnUserGoals,
  correctAnswerGoals,
} from "../config/achievementGoals";
import { SlDiamond } from "react-icons/sl";
import { TbCalendarStats } from "react-icons/tb";
import { FiAward } from "react-icons/fi";
import styles from "../componentStyles/CustomToast.module.css";

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
        <div className={styles.toast}>
          <TbCalendarStats color="white" size="50px" />
          <div> Days used in a row </div>
          <div>{JSON.parse(localStorage.getItem("returnUsage"))[1]}</div>
          {bonusGemDate !== today && (
            <div className={styles.gem}>
              1 ×&nbsp;
              <SlDiamond color={"deepSkyBlue"} size="20px" />
            </div>
          )}
        </div>
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
        <div className={styles.returnUserToast}>
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
        </div>
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
