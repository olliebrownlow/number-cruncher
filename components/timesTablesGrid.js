import styles from "../componentStyles/TimesTablesGrid.module.css";
import tables from "../config/tables";

const TimesTablesGrid = (props) => {
  const { selected, setSelected } = props;

  const handleTableSelect = (table) => {
    selected.includes(table)
      ? setSelected(selected.filter((s) => s !== table))
      : setSelected([...selected, table]);
  };

  return (
    <div className={styles.timestablesGrid}>
      {tables.map((table) => (
        <div
          key={table}
          className={styles.table}
          onClick={() => handleTableSelect(table)}
          style={{
            backgroundColor: selected.includes(table) ? "darkGrey" : "",
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
