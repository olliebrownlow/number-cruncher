import React from "react";
import Spacer from "../components/spacer";
import { getColour } from "../utils/getColour";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import styles from "../componentStyles/ProgressHistoryCards.module.css";
import colours from "../config/colours";

const ProgressHistoryCards = (props) => {
  const {
    getTotalCountForTable,
    handleClick,
    getLocalHealth,
    orderedTableArray,
  } = props;
  const tableIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <div className={styles.cardContainer}>
      {tableIndexes.map((tableIndex) => (
        <React.Fragment key={tableIndex}>
          {getTotalCountForTable(tableIndex, true) ||
          getTotalCountForTable(tableIndex, false) ? (
            <>
              <div
                className={styles.card}
                style={{
                  border: `${
                    colours[Math.floor(Math.random() * colours.length)]
                  } solid 6px`,
                }}
                onClick={() => handleClick(tableIndex)}
              >
                <div
                  className={styles.title}
                  style={{
                    color: `${
                      colours[Math.floor(Math.random() * colours.length)]
                    }`,
                  }}
                >
                  {tableIndex + 1} times table
                </div>
                <div className={styles.localResultsContainer}>
                  <div className={styles.fact}>Correct</div>
                  <div className={styles.fact}>Incorrect</div>
                  <div
                    className={styles.fact}
                    style={{
                      fontWeight: "900",
                    }}
                  >
                    {getTotalCountForTable(tableIndex, true)}
                  </div>
                  <div
                    className={styles.fact}
                    style={{
                      fontWeight: "900",
                    }}
                  >
                    {getTotalCountForTable(tableIndex, false)}
                  </div>
                </div>
                <Spacer size="0.75rem" />
                <div className={styles.localProgressBarContainer}>
                  <ProgressBar
                    percent={getLocalHealth(tableIndex)}
                    filledBackground={getColour(getLocalHealth(tableIndex))}
                    unfilledBackground={
                      getLocalHealth(tableIndex) === "0" ? "red" : ""
                    }
                    height={7.5}
                  >
                    <Step>
                      {() => <div className={styles.firstStep}></div>}
                    </Step>
                    <Step>
                      {() => (
                        <div className={styles.standing}>
                          {getLocalHealth(tableIndex) + "%"}
                        </div>
                      )}
                    </Step>
                    <Step>
                      {() => <div className={styles.indexedStep}></div>}
                    </Step>
                  </ProgressBar>
                </div>
                <Spacer size="0.25rem" />
                {orderedTableArray(tableIndex, 5, false).length ? (
                  <>
                    <div className={styles.fact}>Most Common Errors</div>
                    <div className={styles.tableContainer}>
                      <div className={styles.gridEntry}>Ques.</div>
                      <div className={styles.gridEntry}>Correct</div>
                      <div className={styles.gridEntry}>Incorrect</div>
                      {orderedTableArray(tableIndex, 5, false).map((row) => (
                        <React.Fragment key={row}>
                          <div className={styles.gridEntry}>
                            {tableIndex + 1} × {row[0]}
                          </div>
                          <div className={styles.gridEntry}>{row[1]}</div>
                          <div className={styles.gridEntry}>{row[2]}</div>
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <Spacer size={"0.5rem"} />
                  </>
                )}
              </div>
            </>
          ) : (
            <React.Fragment key={tableIndex}></React.Fragment>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressHistoryCards;
