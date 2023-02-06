import styles from "../componentStyles/SelectNoOfQusGrid.module.css";

const SelectNoOfQusGrid = (props) => {
  const {
    setNumOfQuestions,
    setNumOfQuestionsReserved,
    orderedQuestions,
    numOfQuestions,
    numOfQuestionsReserved,
    selected,
  } = props;

  const handleDecrementNumberOfQuestions = () => {
    if (orderedQuestions === "mixed up") {
      if (numOfQuestions === "no limit") {
        setNumOfQuestions(parseInt(numOfQuestionsReserved));
      }
      if (numOfQuestionsReserved > 5) {
        const newNum = parseInt(numOfQuestionsReserved) - 5;
        setNumOfQuestions(JSON.stringify(newNum));
        setNumOfQuestionsReserved(JSON.stringify(newNum));
      }
    }
  };

  const handleIncrementNumberOfQuestions = () => {
    if (orderedQuestions === "mixed up") {
      if (numOfQuestions === "no limit") {
        const newNum = parseInt(numOfQuestionsReserved) + 5;
        setNumOfQuestions(JSON.stringify(newNum));
        setNumOfQuestionsReserved(JSON.stringify(newNum));
      } else {
        const newNum = parseInt(numOfQuestions) + 5;
        setNumOfQuestions(JSON.stringify(newNum));
        setNumOfQuestionsReserved(JSON.stringify(newNum));
      }
    }
  };

  const handleNoLimit = () => {
    if (orderedQuestions === "mixed up") {
      if (numOfQuestions === "no limit") {
        setNumOfQuestions(numOfQuestionsReserved);
      } else {
        setNumOfQuestions("no limit");
      }
    }
  };

  return (
    <>
      <div className={styles.noOfQuestionsGrid}>
        <div
          className={styles.number}
          onClick={handleDecrementNumberOfQuestions}
          style={{
            opacity: orderedQuestions === "in order" && "0.3",
          }}
        >
          -5
        </div>
        {orderedQuestions === "mixed up" ? (
          <div className={styles.optionHeading}>
            {numOfQuestions === "no limit" ? "\u221E" : numOfQuestions}
          </div>
        ) : (
          <div className={styles.optionHeading}>{selected.length * 12}</div>
        )}
        <div
          className={styles.number}
          style={{
            opacity: orderedQuestions === "in order" && "0.3",
          }}
          onClick={handleIncrementNumberOfQuestions}
        >
          +5
        </div>
        <div
          className={styles.stretched}
          style={{
            backgroundColor: numOfQuestions === "no limit" ? "darkGrey" : "",
            color: numOfQuestions === "no limit" ? "black" : "",
            fontSize: numOfQuestions === "no limit" ? "1.5rem" : "1rem",
            opacity: orderedQuestions === "in order" && "0.3",
          }}
          onClick={handleNoLimit}
        >
          no limit
        </div>
      </div>
    </>
  );
};

export default SelectNoOfQusGrid;
