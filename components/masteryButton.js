import { useRouter } from "next/router";
import { GiOrbDirection } from "react-icons/gi";
import styles from "../componentStyles/MasteryButton.module.css";

const MasteryButton = () => {
  const router = useRouter();

  const goToMasteryPage = () => {
    router.push("/mastery");
  };

  return (
    <>
      <div
        className={styles.masteryButton}
        onClick={() => goToMasteryPage()}
      >
        <GiOrbDirection size={20} />
        mastery
      </div>
    </>
  );
};

export default MasteryButton;
