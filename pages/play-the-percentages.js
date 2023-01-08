import BackButton from "../components/backButton";
import styles from "../styles/PracticeMode.module.css";

const PlayThePercentages = (props) => {
  return (
    <>
      <BackButton />
      <div className={styles.center}>
        <h1 className={styles.heading}>Play The Percentages</h1>
      </div>
    </>
  );
};

export default PlayThePercentages;
