import BackButton from "../components/backButton";
import styles from "../styles/PracticeMode.module.css";

const Journey = (props) => {
  return (
    <>
      <BackButton />
      <main className={styles.main}>
        <div className={styles.center}>
          <h1 className={styles.heading}>Journey</h1>
        </div>
      </main>
    </>
  );
};

export default Journey;