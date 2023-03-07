import toast from "react-hot-toast";
import correctAnswerGoals from "../config/correctAnswerGoals";

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
    const tablesArray = JSON.parse(sessionStorage.getItem("tablesInUse"));
    if (sessionStorage.getItem("questionOrdering") === "in order") {
      sessionStorage.setItem("currentMultiplier", 1);
      const orderedTables = tablesArray.sort((a, b) => a - b);
      sessionStorage.setItem("currentTable", orderedTables[0]);
    } else {
      const shuffledTables = tablesArray.sort(() => 0.5 - Math.random());
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

export const isNewAchCorrectAnswersAwardDue = () => {
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
  let tablesArray = JSON.parse(sessionStorage.getItem("tablesInUse"));
  if (sessionStorage.getItem("questionOrdering") === "mixed up") {
    const shuffledTables = tablesArray.sort(() => 0.5 - Math.random());
    sessionStorage.setItem("currentTable", shuffledTables.slice(0, 1));
    const newMultplier = Math.floor(Math.random() * 12) + 1;
    sessionStorage.setItem("currentMultiplier", newMultplier);
  } else {
    if (parseInt(sessionStorage.getItem("currentMultiplier")) < 12) {
      const newMultiplier =
        parseInt(sessionStorage.getItem("currentMultiplier")) + 1;
      sessionStorage.setItem("currentMultiplier", newMultiplier);
    } else {
      const orderedTables = tablesArray.sort((a, b) => a - b);
      var index = orderedTables.indexOf(
        parseInt(sessionStorage.getItem("currentTable"))
      );
      sessionStorage.setItem("currentTable", orderedTables[index + 1]);
      sessionStorage.setItem("currentMultiplier", 1);
    }
  }
};
