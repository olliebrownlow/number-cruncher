import { useState, useEffect } from "react";
import styles from "../componentStyles/TablesInPlayGrid.module.css";

const TablesInPlayGrid = () => {
  const [tablesInPlay, setTablesInPlay] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tablesInPlay = JSON.parse(sessionStorage.getItem("tablesInUse"));
      setTablesInPlay(tablesInPlay);
    }
  }, []);

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
