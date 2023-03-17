export const getGameEndMessage = (percentageOfBest) => {
  let options = [];
  if (percentageOfBest > 100) {
    options = [
      "Amazing!",
      "You're the best!",
      "Incredible!",
      "Soooo good!",
      "Brilliant!",
      "Wow!!",
      "What a star!",
      "You make it look so easy!",
      "Awesome!",
      "Nice going!",
      "Show the world!",
      "Crazy times!",
      "Cool as a cucumber!!",
      "This is your time to shine!"
    ];
  } else if (percentageOfBest >= 95 && percentageOfBest <= 100) {
    options = ["That was unlucky!", "Soooo close!", "Almost!", "A whisker away!"];
  } else {
    options = [
      "Unlucky",
      "Better luck next time",
      "Try again?",
      "Oh no!",
      "Nice try!",
      "Keep trying",
      "Hard luck",
      "Maybe next time",
      "You can do it",
    ];
  }
  return options[Math.floor(Math.random() * options.length)];
};
