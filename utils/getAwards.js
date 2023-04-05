import {
  atcaAwards,
  streakEasyAwards,
  streakMediumAwards,
  streakHardAwards,
} from "../config/awards";

export const getAwards = (awardType, fontSize, awardStyle) => {
  switch (awardType) {
    case "atcaAwards":
      return atcaAwards(fontSize, awardStyle);
    case "streakEasyAwards":
      return streakEasyAwards(fontSize, awardStyle);
    case "streakMediumAwards":
      return streakMediumAwards(fontSize, awardStyle);
    case "streakHardAwards":
      return streakHardAwards(fontSize, awardStyle);
    default:
      return atcaAwards(fontSize, awardStyle);
  }
};
