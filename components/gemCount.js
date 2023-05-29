import { useEffect, useState } from "react";
import { SlDiamond } from "react-icons/sl";
import styles from "../componentStyles/GemCount.module.css";

const GemCount = (props) => {
  const { reload, fixedPosition } = props;
  const [currentGemCount, setCurrentGemCount] = useState();
  const [isSizedUp, setIsSizedUp] = useState("mounted");

  useEffect(() => {
    const gemCount = parseInt(localStorage.getItem("gemCount"));
    setCurrentGemCount(gemCount);
  }, [reload]);

  const toggleSizing = () => {
    if (isSizedUp === "true") {
      setIsSizedUp("false");
    } else if (isSizedUp === "false") {
      setIsSizedUp("true");
    } else {
      setIsSizedUp("true");
    }
  };

  return (
    <>
      <div
        className={
          isSizedUp === "true"
            ? styles.gemCount + ` ${styles.grow}`
            : isSizedUp === "false"
            ? styles.gemCount + ` ${styles.shrink}`
            : styles.gemCount
        }
        style={{ position: fixedPosition ? "fixed" : "absolute" }}
        onClick={toggleSizing}
      >
        <div
          className={
            isSizedUp === "true"
              ? styles.gemInfo + ` ${styles.grow2}`
              : isSizedUp === "false"
              ? styles.shrink2
              : styles.hide
          }
        >
          Gem Count
        </div>
        <div className={styles.mainText}>
          <SlDiamond size={24} color={"deepskyblue"} /> &nbsp; ={" "}
          {currentGemCount}
        </div>
      </div>
    </>
  );
};

export default GemCount;
