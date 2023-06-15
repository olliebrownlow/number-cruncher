import { useRouter } from "next/router";
import { GiBullseye } from "react-icons/gi";
import styles from "../componentStyles/ChallengesButton.module.css";

const ChallengesButton = () => {
  const router = useRouter();

  const goToChallengesPage = () => {
    router.push("/challenges");
  };

  return (
    <>
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
