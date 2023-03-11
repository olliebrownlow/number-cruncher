import { useState, useEffect } from "react";
import styles from "../componentStyles/TablesInPlayGrid.module.css";
import colours from "../config/colours";

const TablesInPlayGrid = () => {
  const [tablesInPlay, setTablesInPlay] = useState([]);

  useEffect(() => {
    const gt = sessionStorage.getItem("gameType");
    const gameOptions = JSON.parse(sessionStorage.getItem(`${gt}GameOptions`));
    setTablesInPlay(gameOptions.orderedSelectedTables);
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
        <div
          className={styles.table}
          key={table}
          style={{
            backgroundColor:
              colours[Math.floor(Math.random() * colours.length)],
          }}
        >
          {table}
        </div>
      ))}
    </div>
  );
};

export default TablesInPlayGrid;
