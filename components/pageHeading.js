import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import styles from "../componentStyles/PageHeading.module.css";
import { GiLockedChest } from "react-icons/gi";
import colours from "../config/colours";

const PageHeading = (props) => {
  const { heading } = props;
  const [refresh, setRefresh] = useState(0);
  const [color, setColor] = useState([]);

  useEffect(() => {
    const arr = [];
    for (var i = 0; i < 50; i++) {
      arr.push(colours[Math.floor(Math.random() * colours.length)]);
    }
    setColor(arr);
  }, [refresh]);

  const formatHeading = () => {
    const headingArray = heading.split("");
    return headingArray;
  };

  const handleClick = () => {
    setRefresh(refresh + 1);
    const hiddenAwardClicks = JSON.parse(
      localStorage.getItem("hiddenAwardClicks")
    );
    if (
      refresh + 1 === 20 &&
      heading === "Number Cruncher" &&
      !hiddenAwardClicks.found &&
      hiddenAwardClicks.unlocked
    ) {
      hiddenAwardClicks.found = true;
      localStorage.setItem(
        "hiddenAwardClicks",
        JSON.stringify(hiddenAwardClicks)
      );
      toast.custom(
        <div onClick={() => toast.remove()} className={styles.toast}>
          <div> BURIED TREASURE FOUND! </div>
          <div className={styles.treasureChest}>
          <GiLockedChest /></div>
          <div> go to achievements</div>
        </div>
      );
    }
  };

  return (
    <>
      <div className={styles.center}>
        <h1 className={styles.heading} onClick={() => handleClick()}>
          {formatHeading().map((letter, index) => (
            <span
              key={index}
              style={{
                color: color[index],
              }}
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>
    </>
  );
};

export default PageHeading;
