import styles from "../componentStyles/NoOfQuestionsGrid.module.css";
import noOfQus from "../config/noOfQus";

const NoOfQuestionsGrid = (props) => {
  const {
    setNumOfQuestions,
    setNumOfQuestionsReserved,
    orderedQuestions,
    numOfQuestions,
    selected,
  } = props;

  const handleNumberOfQuestions = (number) => {
    setNumOfQuestions(number);
    setNumOfQuestionsReserved(number);
  };

  return (
    <>
      {orderedQuestions === "mixed up" ? (
        <div className={styles.noOfQuestionsGrid}>
          {noOfQus.map((number) => (
            <div
              key={number}
              className={styles.number}
              className={
                styles.number +
                " " +
                `${number === "no limit" ? styles.stretched : ""}`
              }
              onClick={() => handleNumberOfQuestions(number)}
              style={{
                backgroundColor: numOfQuestions === number ? "darkGrey" : "",
                color: numOfQuestions === number ? "black" : "",
                fontSize: numOfQuestions === number ? "1.5rem" : "1rem",
              }}
            >
              {number}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.optionHeading}>{selected.length * 12}</div>
      )}
    </>
  );
};

export default NoOfQuestionsGrid;
