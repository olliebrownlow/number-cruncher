import styles from "../componentStyles/QuestionOrderingGrid.module.css";
import questionOrdering from "../config/questionOrdering";
import colours from "../config/colours";

const QuestionOrderingGrid = (props) => {
  const {
    setNumOfQuestions,
    setOrderedQuestions,
    selected,
    numOfQuestionsReserved,
    orderedQuestions,
  } = props;

  const handleOrdering = (ordering) => {
    if (ordering === "in order") {
      setNumOfQuestions(selected.length * 12);
    } else {
      setNumOfQuestions(numOfQuestionsReserved);
    }
    setOrderedQuestions(ordering);
  };

  return (
    <div className={styles.questionOrderingGrid}>
      {questionOrdering.map((ordering) => (
        <div
          key={ordering}
          className={styles.ordering}
          onClick={() => handleOrdering(ordering)}
          style={{
            backgroundColor:
              orderedQuestions === ordering &&
              colours[Math.floor(Math.random() * colours.length)],
            color: orderedQuestions === ordering && "black",
            fontSize: orderedQuestions === ordering ? "1.5rem" : "1rem",
          }}
        >
          {ordering}
        </div>
      ))}
    </div>
  );
};

export default QuestionOrderingGrid;
