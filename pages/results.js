import { useState, useEffect } from "react";
import BackButton from "../components/backButton";
import PageHeading from "../components/pageHeading";
import Spacer from "../components/spacer";
import styles from "../styles/Results.module.css";

const Results = () => {
  const [qAndAs, setQAndAs] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    setQAndAs(JSON.parse(sessionStorage.getItem("prevQuestionAnswersArray")));
  }, []);

  const toggleFilter = () => {
    setIsFiltered(!isFiltered);
  };

  const getIncorrectQandAs = () => {
    return qAndAs.filter((qAndA) => qAndA.isCorrect == false);
  };

  const areAllCorrect = () => {
    if (qAndAs.filter((qAndA) => qAndA.isCorrect == false).length === 0) {
      return false;
    }
    return true;
  };

  return (
    <>
      <BackButton />
      <PageHeading heading={"Practice Mode Results"} />
      <div>
        You got{" "}
        {typeof window !== "undefined" &&
          sessionStorage.getItem("correctCounter")}{" "}
        out of{" "}
        {typeof window !== "undefined" &&
          sessionStorage.getItem("numOfQuestions")}{" "}
        questions right!
      </div>
      <Spacer />
      <div className={styles.headingsGrid}>
        <div>question</div>
        <div>answer</div>
        <div>your answer</div>
      </div>
      <Spacer />
      {!isFiltered
        ? qAndAs.map((set) => (
            <div key={set.id} className={styles.answersGrid}>
              <>
                <div>
                  {set.table} × {set.multiplier}
                </div>
                <div
                  style={{
                    color: "green",
                  }}
                >
                  {set.table * set.multiplier}
                </div>
                <div
                  style={{
                    color: set.isCorrect ? "green" : "red",
                  }}
                >
                  {set.userAnswer ? set.userAnswer : "--"}
                </div>
              </>
            </div>
          ))
        : getIncorrectQandAs().map((set) => (
            <div key={set.id} className={styles.answersGrid}>
              <>
                <div>
                  {set.table} × {set.multiplier}
                </div>
                <div
                  style={{
                    color: "green",
                  }}
                >
                  {set.table * set.multiplier}
                </div>
                <div
                  style={{
                    color: "red",
                  }}
                >
                  {set.userAnswer ? set.userAnswer : "--"}
                </div>
              </>
            </div>
          ))}
      <Spacer />
      {areAllCorrect() && (
        <div className={styles.filterButton} onClick={() => toggleFilter()}>
          {isFiltered ? "see all answers" : "see incorrect only"}
        </div>
      )}

      <Spacer />
    </>
  );
};

export default Results;
