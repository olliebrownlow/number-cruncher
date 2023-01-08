import BackButton from "../components/backButton";
import styles from "../styles/PracticeMode.module.css";

const PracticeMode = (props) => {
  return (
    <>
      <BackButton />
      <div className={styles.center}>
        <h1 className={styles.heading}>Practice Mode</h1>
      </div>
    </>
  );
};

export default PracticeMode;
