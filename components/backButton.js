import { useRouter } from "next/router";
import { ChevronsLeft } from "react-feather";
import styles from "../componentStyles/BackButton.module.css"

const BackButton = (props) => {
  const router = useRouter();

  return (
    <>
      <div className={styles.backButton} onClick={() => router.back()}>
        <ChevronsLeft size={16} /> back
      </div>
    </>
  );
};

export default BackButton;
