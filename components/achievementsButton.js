import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { RxDotFilled } from "react-icons/rx";
import styles from "../componentStyles/AchievementsButton.module.css";
import { GiAchievement } from "react-icons/gi";

const AchievementsButton = () => {
  const router = useRouter();
  const [achievementsToClaim, setAchievementsToClaim] = useState(false);

  useEffect(() => {
    const isReturnUsageClaimed = JSON.parse(
      localStorage.getItem("isReturnUsageClaimed")
    );
    const isATCAClaimed = JSON.parse(localStorage.getItem("isATCAClaimed"));
    const isStreakEasyClaimed = JSON.parse(
      localStorage.getItem("isStreakEasyClaimed")
    );
    const isStreakMediumClaimed = JSON.parse(
      localStorage.getItem("isStreakMediumClaimed")
    );
    const isStreakHardClaimed = JSON.parse(
      localStorage.getItem("isStreakHardClaimed")
    );
    const hiddenAwardClicks = JSON.parse(
      localStorage.getItem("hiddenAwardClicks")
    );

    if (
      (isReturnUsageClaimed && isReturnUsageClaimed.includes(0)) ||
      (isATCAClaimed && isATCAClaimed.includes(0)) ||
      (isStreakEasyClaimed && isStreakEasyClaimed.includes(0)) ||
      (isStreakMediumClaimed && isStreakMediumClaimed.includes(0)) ||
      (isStreakHardClaimed && isStreakHardClaimed.includes(0)) ||
      (hiddenAwardClicks &&
        hiddenAwardClicks.challengeCompleted &&
        !hiddenAwardClicks.awardClaimed)
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
        <GiAchievement size={20} /> achievements
      </div>
    </>
  );
};

export default AchievementsButton;
