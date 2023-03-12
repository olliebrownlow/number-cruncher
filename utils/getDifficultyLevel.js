export const getDifficultyLevel = (orderedSelectedTables) => {
  switch (orderedSelectedTables.join()) {
    case "1,2,10":
      return "Easy";
    case "3,5,11":
      return "Medium";
    case "4,6,7,8,9,12":
      return "Hard";
    default:
      return "Other";
  }
};