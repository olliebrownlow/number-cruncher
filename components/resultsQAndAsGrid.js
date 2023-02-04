import { X, Check } from "react-feather";
import styles from "../componentStyles/ResultsQAndAsGrid.module.css";

const ResultsQAndAsGrid = (props) => {
  const { resultsQAndAsToMap } = props;
  return (
    <>
      {resultsQAndAsToMap.map((set) => (
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
      ))}
    </>
  );
};

export default ResultsQAndAsGrid;
