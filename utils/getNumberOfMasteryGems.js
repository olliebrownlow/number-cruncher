export const getNumberOfMasteryGems = (index) => {
  switch (index) {
    case 1:
      return 1;
    case 2:
      return 3;
    case 3:
      return 5;
    case 4:
      return 10;
    default:
      return 0;
  }
};
