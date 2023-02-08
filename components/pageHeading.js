import styles from "../componentStyles/PageHeading.module.css";
import colours from "../config/colours";

const PageHeading = (props) => {
  const { heading } = props;

  const formatHeading = () => {
    const headingArray = heading.split("");
    return headingArray;
  };
  return (
    <>
      <div className={styles.center}>
        <h1 className={styles.heading}>
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
