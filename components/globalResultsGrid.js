import styles from "../componentStyles/GlobalResultsGrid.module.css";

const GlobalResultsGrid = (props) => {
  const { totalGlobalCount } = props;

  return (
    <div className={styles.globalResultsContainer}>
      <div className={styles.globalResults}>correct</div>
      <div className={styles.globalResults}>incorrect</div>
      <div className={styles.globalResults}>{totalGlobalCount(true)}</div>
      <div className={styles.globalResults}>{totalGlobalCount(false)}</div>
    </div>
  );
};

export default GlobalResultsGrid;
