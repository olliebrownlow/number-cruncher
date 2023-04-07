import styles from "../componentStyles/ReleaseTable.module.css";
import releaseInfo from "../config/releaseInfo";

const ReleaseTable = () => {
  return (
    <div>
      {releaseInfo.map((row) => (
        <div key={row.release} className={styles.releaseTableGrid}>
          <div className={styles.releaseTableCell}>{row.release}</div>
          <div className={styles.releaseTableCell}>{row.date}</div>
          <div className={styles.releaseTableCell}>{row.features}</div>
        </div>
      ))}
    </div>
  );
};

export default ReleaseTable;
