import { useRouter } from "next/router";
import { Home } from "react-feather";
import styles from "../componentStyles/HomeButton.module.css";

const HomeButton = (props) => {
  const router = useRouter();

  return (
    <>
      <div className={styles.homeButton} onClick={() => router.push("/")}>
        <Home size={16} /> home
      </div>
    </>
  );
};

export default HomeButton;
