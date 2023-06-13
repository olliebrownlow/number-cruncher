import { getNumberOfDays } from "./progressHistoryLogic";

export const getTotalCorrectForTable = (tableIndex) => {
  if (typeof window !== "undefined") {
    const storage = JSON.parse(localStorage.getItem("historyInfo"));
    let total = 0;
    for (let i = 0; i < 12; i++) {
      const count = storage[tableIndex][i]
        .filter((x) => x[0] === true)
        .filter((x) => getNumberOfDays(x[1]) <= 3650).length;
      total = total + count;
    }
    return total;
  }
};

export const getSkillPercentage = (tableIndex, max) => {
  if (getTotalCorrectForTable(tableIndex) === 0) {
    return 0;
  }

  return Math.floor(((getTotalCorrectForTable(tableIndex) / max) * 100)).toFixed(0);
};
