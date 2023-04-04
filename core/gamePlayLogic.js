import toast from "react-hot-toast";
import { correctAnswerGoals } from "../config/achievementGoals";

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

const getToastMessage = (index, currentGlobalCount) => {
  if (correctAnswerGoals[index + 1]) {
    return `NEW AWARD!!!\nClaim your award for getting ${currentGlobalCount} questions correct! \n Next target\n${
      correctAnswerGoals[index + 1]
    }`;
  }
  return `NEW AWARD!!!\nClaim your award for getting ${currentGlobalCount} questions correct!`;
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
    toast.success(getToastMessage(index, currentGlobalCount), {
      id: "correctAnswersAchievement",
    });
  }
};

export const newAchStreakAwardIfDue = (level) => {};

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
