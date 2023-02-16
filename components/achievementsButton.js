import { useRouter } from "next/router";
import { FiAward } from "react-icons/fi";
import styles from "../componentStyles/AchievementsButton.module.css";

const AchievementsButton = () => {
  const router = useRouter();

  return (
    <>
      <div
        className={styles.achievementsButton}
        onClick={() => router.push("/achievements")}
      >
        <FiAward size={16} /> achievements
      </div>
    </>
  );
};

export default AchievementsButton;
