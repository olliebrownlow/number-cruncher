import styles from "../componentStyles/TimesTablesGrid.module.css";

const TimesTablesGrid = (props) => {
  const { tables, handleTableSelect, selected } = props;
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
