import { useRouter } from "next/router";
import { GiMightyForce } from "react-icons/gi";
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
        <GiMightyForce size={20} />
        mastery
      </div>
    </>
  );
};

export default MasteryButton;
