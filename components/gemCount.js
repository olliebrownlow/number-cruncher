import { useEffect, useState } from "react";
import { SlDiamond } from "react-icons/sl";
import styles from "../componentStyles/GemCount.module.css";

const GemCount = (props) => {
  const { reload, fixedPosition } = props;
  const [currentGemCount, setCurrentGemCount] = useState();

  useEffect(() => {
    const gemCount = parseInt(localStorage.getItem("gemCount"));
    setCurrentGemCount(gemCount);
  }, [reload]);

  return (
    <>
      <div
        className={styles.gemCount}
        style={{ position: fixedPosition ? "fixed" : "absolute" }}
      >
        <SlDiamond size={24} color={"deepskyblue"} /> &nbsp; = {currentGemCount}
      </div>
    </>
  );
};

export default GemCount;
