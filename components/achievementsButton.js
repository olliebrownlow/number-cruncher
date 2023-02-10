import { useRouter } from "next/router";
import { Award } from "react-feather";
import styles from "../componentStyles/AchievementsButton.module.css";

const AchievementsButton = () => {
  const router = useRouter();

  return (
    <>
      <div className={styles.achievementsButton} onClick={() => router.push("/achievements")}>
        <Award size={16} /> achievements
      </div>
    </>
  );
};

export default AchievementsButton;
