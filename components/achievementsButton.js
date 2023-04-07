import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FiAward } from "react-icons/fi";
import { RxDotFilled } from "react-icons/rx";
import styles from "../componentStyles/AchievementsButton.module.css";

const AchievementsButton = () => {
  const router = useRouter();
  const [achievementsToClaim, setAchievementsToClaim] = useState(false);

  useEffect(() => {
    const isStreakEasyClaimed = JSON.parse(
      localStorage.getItem("isStreakEasyClaimed")
    );
    const isStreakMediumClaimed = JSON.parse(
      localStorage.getItem("isStreakMediumClaimed")
    );
    const isStreakHardClaimed = JSON.parse(
      localStorage.getItem("isStreakHardClaimed")
    );

    if (
      isStreakEasyClaimed.includes(0) ||
      isStreakMediumClaimed.includes(0) ||
      isStreakHardClaimed.includes(0)
    ) {
      setAchievementsToClaim(true);
    } else setAchievementsToClaim(false);
  }, []);

  return (
    <>
      {achievementsToClaim && (
        <div className={styles.claimMarker}>
          <RxDotFilled size={24} color={"dodgerblue"} />
        </div>
      )}
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
