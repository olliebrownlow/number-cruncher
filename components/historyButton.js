import { useRouter } from "next/router";
import { GiProgression } from "react-icons/gi";
import styles from "../componentStyles/HistoryButton.module.css";

const HistoryButton = () => {
  const router = useRouter();

  const goToHistory = () => {
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("timeframe") === null
    ) {
      sessionStorage.setItem("timeframe", 1);
    }
    router.push("/history");
  };

  return (
    <>
      <div className={styles.historyButton} onClick={() => goToHistory()}>
        <GiProgression size={16} />progress
      </div>
    </>
  );
};

export default HistoryButton;
