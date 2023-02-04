import { useState, useEffect } from "react";
import HomeButton from "../components/homeButton";
import BackButton from "../components/backButton";
import PageHeading from "../components/pageHeading";
import ResultStatement from "../components/resultStatement";
import FilterButton from "../components/filterButton";
import Spacer from "../components/spacer";
import { X, Check } from "react-feather";
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
    return qAndAs.filter((qAndA) => qAndA.isCorrect === false);
  };

  const isAtLeastOneRightAndOneWrong = () => {
    const allCorrect = qAndAs.filter((qAndA) => !qAndA.isCorrect).length === 0;
    const allIncorrect = qAndAs.filter((qAndA) => qAndA.isCorrect).length === 0;
    if (allCorrect || allIncorrect) {
      return false;
    }
    return true;
  };

  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"Practice Mode Results"} />
      <ResultStatement />
      <Spacer />
      <FilterButton
        isAtLeastOneRightAndOneWrong={isAtLeastOneRightAndOneWrong}
        toggleFilter={toggleFilter}
        isFiltered={isFiltered}
      />
      <Spacer />
      {!isFiltered
        ? qAndAs.map((set) => (
            <div key={set.id} className={styles.answersGrid}>
              <>
                <div>{set.id}.</div>
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
                {set.isCorrect ? (
                  <div
                    style={{
                      color: set.isCorrect ? "green" : "red",
                    }}
                  >
                    <Check size={24} />
                  </div>
                ) : (
                  <div
                    style={{
                      color: set.isCorrect ? "green" : "red",
                    }}
                  >
                    <X size={24} />
                  </div>
                )}
              </>
            </div>
          ))
        : getIncorrectQandAs().map((set) => (
            <div key={set.id} className={styles.answersGrid}>
              <>
                <div>{set.id}.</div>
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
                <div
                  style={{
                    color: "red",
                  }}
                >
                  <X size={24} />
                </div>
              </>
            </div>
          ))}
      <Spacer />
    </>
  );
};

export default Results;
