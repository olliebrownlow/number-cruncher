import styles from "../componentStyles/TablesInPlayGrid.module.css";

const TablesInPlayGrid = (props) => {
  const { tablesInPlay } = props;
  return (
    <div
      className={styles.tablesInPlayGrid}
      style={{
        gridTemplateColumns:
          tablesInPlay.length > 8
            ? `repeat(${Math.ceil(tablesInPlay.length / 2)}, auto)`
            : `repeat(${tablesInPlay.length}, auto)`,
      }}
    >
      {tablesInPlay.map((table) => (
        <div className={styles.table} key={table}>
          {table}
        </div>
      ))}
    </div>
  );
};

export default TablesInPlayGrid;
