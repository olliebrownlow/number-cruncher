export const getNumberOfDays = (dateOfRecord) => {
  const date1 = new Date(dateOfRecord);
  const today = new Date().toISOString().split("T")[0];
  const date2 = new Date(today);
  const oneDayInMS = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();
  const diffInDays = Math.round(diffInTime / oneDayInMS);
  // same day = 0
  return diffInDays + 1;
};

export const totalGlobalCount = (isCorrect) => {
  if (typeof window !== "undefined") {
    const storage = JSON.parse(localStorage.getItem("historyInfo"));
    const timeframe = JSON.parse(sessionStorage.getItem("timeframe"));
    let total = 0;
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 12; j++) {
        const count = storage[i][j]
          .filter((x) => x[0] === isCorrect)
          .filter((y) => getNumberOfDays(y[1]) <= timeframe).length;
        total = total + count;
      }
    }
    return total;
  }
};

export const getTotalCountForTable = (tableIndex, isCorrect) => {
  if (typeof window !== "undefined") {
    const storage = JSON.parse(localStorage.getItem("historyInfo"));
    const timeframe = JSON.parse(sessionStorage.getItem("timeframe"));
    let total = 0;
    for (let i = 0; i < 12; i++) {
      const count = storage[tableIndex][i]
        .filter((x) => x[0] === isCorrect)
        .filter((x) => getNumberOfDays(x[1]) <= timeframe).length;
      total = total + count;
    }
    return total;
  }
};

export const orderedTableArray = (tableIndex, splicer, showAll) => {
  let arr = [];
  if (typeof window !== "undefined") {
    const timeframe = JSON.parse(sessionStorage.getItem("timeframe"));
    const tableHistory = JSON.parse(localStorage.getItem("historyInfo"));
    const tableHistoryArray = tableHistory[tableIndex];
    tableHistoryArray.forEach((element, index) => {
      const multiplier = index + 1;
      const correct = element
        .filter((x) => x[0] === true)
        .filter((y) => getNumberOfDays(y[1]) <= timeframe).length;
      const incorrect = element
        .filter((x) => x[0] === false)
        .filter((y) => getNumberOfDays(y[1]) <= timeframe).length;
      if (showAll) {
        arr.push([multiplier, correct, incorrect]);
      } else {
        if (incorrect) {
          arr.push([multiplier, correct, incorrect]);
          arr.sort(function (a, b) {
            return b[2] - a[2];
          });
        }
      }
    });
  }
  return arr.splice(0, splicer);
};

export const getGlobalHealth = () => {
  if (totalGlobalCount(true) === 0 && totalGlobalCount(false) === 0) {
    return 0;
  }

  return (
    (totalGlobalCount(true) /
      (totalGlobalCount(false) + totalGlobalCount(true))) *
    100
  ).toFixed(0);
};

export const getLocalHealth = (tableIndex) => {
  return (
    (getTotalCountForTable(tableIndex, true) /
      (getTotalCountForTable(tableIndex, false) +
        getTotalCountForTable(tableIndex, true))) *
    100
  ).toFixed(0);
};