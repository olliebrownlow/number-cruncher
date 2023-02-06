import styles from "../componentStyles/TimesTablesGrid.module.css";
import tables from "../config/tables";

const TimesTablesGrid = (props) => {
  const { selected, setSelected, orderedQuestions, setNumOfQuestions } = props;

  const colours = [
    "HotPink",
    "Aqua",
    "Coral",
    "DarkOrange",
    "Gold",
    "khaki",
    "Orchid",
    "Plum",
    "Silver",
    "SkyBlue",
    "Yellow",
    "Violet",
  ];

  const handleTableSelect = (table) => {
    if (selected.includes(table)) {
      const newSelected = selected.filter((s) => s !== table);
      setSelected(newSelected);
      if (orderedQuestions === "in order") {
        setNumOfQuestions(newSelected.length * 12);
      }
    } else {
      const newSelected = [...selected, table];
      setSelected(newSelected);
      if (orderedQuestions === "in order") {
        setNumOfQuestions(newSelected.length * 12);
      }
    }
  };

  return (
    <div className={styles.timestablesGrid}>
      {tables.map((table) => (
        <div
          key={table}
          className={styles.table}
          onClick={() => handleTableSelect(table)}
          style={{
            backgroundColor: selected.includes(table)
              ? colours[Math.floor(Math.random() * colours.length)]
              : "",
            color: selected.includes(table) ? "black" : "",
            fontSize: selected.includes(table) ? "2.5rem" : "2rem",
          }}
        >
          {table}
        </div>
      ))}
    </div>
  );
};

export default TimesTablesGrid;
