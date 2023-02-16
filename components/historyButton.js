import { useRouter } from "next/router";
import { HiOutlineClipboardList } from "react-icons/hi";
import styles from "../componentStyles/HistoryButton.module.css";

const HistoryButton = () => {
  const router = useRouter();

  return (
    <>
      <div
        className={styles.historyButton}
        onClick={() => router.push("/history")}
      >
        <HiOutlineClipboardList size={16} /> history
      </div>
    </>
  );
};

export default HistoryButton;
