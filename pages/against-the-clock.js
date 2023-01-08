import BackButton from "../components/backButton";
import styles from "../styles/PracticeMode.module.css";

const AgainstTheClock = (props) => {
  return (
    <>
      <BackButton />
      <main className={styles.main}>
        <div className={styles.center}>
          <h1 className={styles.heading}>Against The Clock</h1>
        </div>
      </main>
    </>
  );
};

export default AgainstTheClock;