export const getColour = (health) => {
  switch (true) {
    case health >= 95:
      return "#008000";
    case health >= 86:
      return "#469200";
    case health >= 77:
      return "#71a300";
    case health >= 68:
      return "#9ab400";
    case health >= 59:
      return "#c4c400";
    case health >= 50:
      return "#d8bf00";
    case health >= 41:
      return "#ecba00";
    case health >= 32:
      return "#ffb300";
    case health >= 23:
      return "#ff9700";
    case health >= 14:
      return "#ff7700";
    case health >= 5:
      return "#ff5100";
    default:
      return "#ff0000";
  }
};
