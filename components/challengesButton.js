import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GiBullseye } from "react-icons/gi";
import { RxDotFilled } from "react-icons/rx";
import styles from "../componentStyles/ChallengesButton.module.css";

const ChallengesButton = () => {
  const [achievementsToClaim, setAchievementsToClaim] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hiddenAwardClicks = JSON.parse(
      localStorage.getItem("hiddenAwardClicks")
    );

    if (
      hiddenAwardClicks &&
      hiddenAwardClicks.challengeCompleted &&
      !hiddenAwardClicks.awardClaimed
    ) {
      setAchievementsToClaim(true);
    } else setAchievementsToClaim(false);
  }, []);

  const goToChallengesPage = () => {
    router.push("/challenges");
  };

  return (
    <>
      {achievementsToClaim && (
        <div className={styles.claimMarker}>
          <RxDotFilled size={24} color={"dodgerblue"} />
        </div>
      )}
      <div
        className={styles.challengesButton}
        onClick={() => goToChallengesPage()}
      >
        <GiBullseye size={20} />
        challenges
      </div>
    </>
  );
};

export default ChallengesButton;
