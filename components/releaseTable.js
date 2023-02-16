import styles from "../componentStyles/ReleaseTable.module.css";
import releaseInfo from "../config/releaseInfo";

const ReleaseTable = () => {
  return (
    <div className={styles.releaseTableGrid}>
      {releaseInfo.map((row) => (
        <>
          <div className={styles.releaseTableCell}>{row.release}</div>
          <div className={styles.releaseTableCell}>{row.date}</div>
          <div className={styles.releaseTableCell}>{row.features}</div>
        </>
      ))}
    </div>
  );
};

export default ReleaseTable;
