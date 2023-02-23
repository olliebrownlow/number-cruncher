import { useRouter } from "next/router";
import { HiOutlineClipboardList } from "react-icons/hi";
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
        <HiOutlineClipboardList size={16} /> history
      </div>
    </>
  );
};

export default HistoryButton;
