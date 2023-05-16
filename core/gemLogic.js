export const handleGems = (gemType, index) => {
  // add gems if relevant
  const gems = JSON.parse(localStorage.getItem(gemType));
  var gemCount = parseInt(localStorage.getItem("gemCount"));
  if (gems[index][0] === false) {
    gems[index][0] = true;
    localStorage.setItem(gemType, JSON.stringify(gems));
    gemCount = gemCount + gems[index][1];
    localStorage.setItem("gemCount", gemCount);
  }
};

export const handleChallengeGems = (challengeType) => {
  // add gems if relevant
  var challenge = JSON.parse(localStorage.getItem(challengeType));
  if (challenge.gemsClaimed === false) {
    challenge.gemsClaimed = true;
    localStorage.setItem(challengeType, JSON.stringify(challenge));
    var gemCount = parseInt(localStorage.getItem("gemCount"));
    gemCount = gemCount + challenge.awardGems;
    localStorage.setItem("gemCount", gemCount);
  }
};
