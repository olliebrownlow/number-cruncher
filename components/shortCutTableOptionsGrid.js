import styles from "../componentStyles/ShortCutTableOptionsGrid.module.css";
import tables from "../config/tables";
import shortCutTableOptions from "../config/shortCutTableOptions";

const ShortCutTableOptionsGrid = (props) => {
  const { setSelected, orderedQuestions, setNumOfQuestions } = props;

  const handleShortCutSelect = (shortCut) => {
    switch (shortCut) {
      case "all":
        setSelected([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        setNumberOfQuestions(12);
        break;
      case "easy":
        setSelected([1, 2, 10]);
        setNumberOfQuestions(3);
        break;
      case "evens":
        setSelected([2, 4, 6, 8, 10, 12]);
        setNumberOfQuestions(6);
        break;
      case "random":
        const shuffledTables = tables.sort(() => 0.5 - Math.random());
        const randomTables = shuffledTables.slice(
          0,
          Math.floor(Math.random() * 12) + 1
        );
        setSelected(randomTables);
        setNumberOfQuestions(randomTables.length);
        tables.sort((a, b) => a - b);
        break;
      case "hard":
        setSelected([4, 6, 7, 8, 9, 12]);
        setNumberOfQuestions(6);
        break;
      case "odds":
        setSelected([1, 3, 5, 7, 9, 11]);
        setNumberOfQuestions(6);
        break;
      case "medium":
        setSelected([3, 5, 11]);
        setNumberOfQuestions(3);
        break;
      case "clear":
        setSelected([]);
        setNumberOfQuestions(0);
        break;
      default:
        setSelected([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        setNumberOfQuestions(12);
    }
  };

  const setNumberOfQuestions = (numOfSelected) => {
    if (orderedQuestions === "in order") {
      setNumOfQuestions(numOfSelected * 12);
    }
  };

  return (
    <div className={styles.shortCutTableOptionsGrid}>
      {shortCutTableOptions.map((shortCut) => (
        <div
          key={shortCut}
          className={styles.shortCutOption}
          onClick={() => handleShortCutSelect(shortCut)}
        >
          {shortCut}
        </div>
      ))}
    </div>
  );
};

export default ShortCutTableOptionsGrid;
