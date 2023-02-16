import { useState } from "react";
import styles from "../componentStyles/SubHeading.module.css";
import colours from "../config/colours";

const SubHeading = (props) => {
  const { subheading, position } = props;
  const [refresh, setRefresh] = useState(0);

  const handleClick = () => {
    setRefresh(refresh + 1);
  };

  return (
    <>
      <div className={position === "left" ? styles.left : styles.center}>
        <h1
          className={styles.heading}
          onClick={() => handleClick()}
          style={{
            color: colours[Math.floor(Math.random() * colours.length)],
          }}
        >
          {subheading}
        </h1>
      </div>
    </>
  );
};

export default SubHeading;
