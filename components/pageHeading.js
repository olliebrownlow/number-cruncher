import { useState } from "react";
import styles from "../componentStyles/PageHeading.module.css";
import colours from "../config/colours";

const PageHeading = (props) => {
  const { heading } = props;
  const [refresh, setRefresh] = useState(0);

  const formatHeading = () => {
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
          {formatHeading().map((letter) => (
            <span
              style={{
                color: colours[Math.floor(Math.random() * colours.length)],
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
