import { useState, useEffect } from "react";
import styles from "../componentStyles/PageHeading.module.css";
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
    console.log(heading)
    const headingArray = heading.split("");
    return headingArray;
  };

  const handleClick = () => {
    setRefresh(refresh + 1);
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
