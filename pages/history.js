import React, { useState, useEffect } from "react";
import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import PageHeading from "../components/pageHeading";
import Spacer from "../components/spacer";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import styles from "../styles/History.module.css";
import colours from "../config/colours";

const History = () => {
  const tableIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const [refresh, setRefresh] = useState(0);
  const [timeframeStatus, setTimeframeStatus] = useState(0);

  useEffect(() => {
    setTimeframeStatus(JSON.parse(sessionStorage.getItem("timeframe")));
  }, []);

  const handleClick = () => {
    setRefresh(refresh + 1);
  };

  const handleTimeframeClick = (timeframe) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("timeframe", timeframe);
    }
    setTimeframeStatus(timeframe);
  };

  const getNumberOfDays = (dateOfRecord) => {
    const date1 = new Date(dateOfRecord);
    const today = new Date().toISOString().split("T")[0];
    const date2 = new Date(today);
    const oneDayInMS = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDayInMS);
    // same day = 0
    return diffInDays + 1;
  };

  const totalGlobalCount = (isCorrect) => {
    if (typeof window !== "undefined") {
      const storage = JSON.parse(localStorage.getItem("historyInfo"));
      const timeframe = JSON.parse(sessionStorage.getItem("timeframe"));
      let total = 0;
      for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
          const count = storage[i][j]
            .filter((x) => x[0] === isCorrect)
            .filter((y) => getNumberOfDays(y[1]) <= timeframe).length;
          total = total + count;
        }
      }
      return total;
    }
  };

  const getTotalCountForTable = (tableIndex, isCorrect) => {
    if (typeof window !== "undefined") {
      const storage = JSON.parse(localStorage.getItem("historyInfo"));
      const timeframe = JSON.parse(sessionStorage.getItem("timeframe"));
      let total = 0;
      for (let i = 0; i < 12; i++) {
        const count = storage[tableIndex][i]
          .filter((x) => x[0] === isCorrect)
          .filter((x) => getNumberOfDays(x[1]) <= timeframe).length;
        total = total + count;
      }
      return total;
    }
  };

  const orderedTableArray = (tableIndex) => {
    let arr = [];
    if (typeof window !== "undefined") {
      const timeframe = JSON.parse(sessionStorage.getItem("timeframe"));
      const tableHistory = JSON.parse(localStorage.getItem("historyInfo"));
      const tableHistoryArray = tableHistory[tableIndex];
      tableHistoryArray.forEach((element, index) => {
        const multiplier = index + 1;
        const correct = element
          .filter((x) => x[0] === true)
          .filter((y) => getNumberOfDays(y[1]) <= timeframe).length;
        const incorrect = element
          .filter((x) => x[0] === false)
          .filter((y) => getNumberOfDays(y[1]) <= timeframe).length;
        if (incorrect) {
          arr.push([multiplier, correct, incorrect]);
        }
      });
    }
    arr.sort(function (a, b) {
      return b[2] - a[2];
    });
    return arr.splice(0, 5);
  };

  const getGlobalHealth = () => {
    if (totalGlobalCount(true) === 0 && totalGlobalCount(false) === 0) {
      return 0;
    }

    return (
      (totalGlobalCount(true) /
        (totalGlobalCount(false) + totalGlobalCount(true))) *
      100
    ).toFixed(0);
  };

  const getLocalHealth = (tableIndex) => {
    return (
      (getTotalCountForTable(tableIndex, true) /
        (getTotalCountForTable(tableIndex, false) +
          getTotalCountForTable(tableIndex, true))) *
      100
    ).toFixed(0);
  };

  const getColour = (health) => {
    switch (true) {
      case health >= 95:
        return "#008000";
      case health >= 86:
        return "#469200";
      case health >= 77:
        return "#71a300";
      case health >= 68:
        return "#9ab400";
      case health >= 59:
        return "#c4c400";
      case health >= 50:
        return "#d8bf00";
      case health >= 41:
        return "#ecba00";
      case health >= 32:
        return "#ffb300";
      case health >= 23:
        return "#ff9700";
      case health >= 14:
        return "#ff7700";
      case health >= 5:
        return "#ff5100";
      default:
        return "#ff0000";
    }
  };

  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"History"} />
      {/* timeframe option buttons */}
      <div className={styles.timeframeGrid}>
        <div
          className={styles.topRowTimeframeOptionLeft}
          onClick={() => handleTimeframeClick(1)}
          style={{
            backgroundColor:
              timeframeStatus === 1 &&
              colours[Math.floor(Math.random() * colours.length)],
            color: timeframeStatus === 1 && "black",
            fontSize: timeframeStatus === 1 ? "1.3rem" : "0.9rem",
          }}
        >
          Today
        </div>
        <div
          className={styles.topRowTimeframeOptionRight}
          onClick={() => handleTimeframeClick(2)}
          style={{
            backgroundColor:
              timeframeStatus === 2 &&
              colours[Math.floor(Math.random() * colours.length)],
            color: timeframeStatus === 2 && "black",
            fontSize: timeframeStatus === 2 ? "1.3rem" : "0.9rem",
          }}
        >
          Last 2 days
        </div>
        <div
          className={styles.secondRowTimeframeOptionLeft}
          onClick={() => handleTimeframeClick(7)}
          style={{
            backgroundColor:
              timeframeStatus === 7 &&
              colours[Math.floor(Math.random() * colours.length)],
            color: timeframeStatus === 7 && "black",
            fontSize: timeframeStatus === 7 ? "1.3rem" : "0.9rem",
          }}
        >
          Last 7 days
        </div>
        <div
          className={styles.secondRowTimeframeOptionMiddle}
          onClick={() => handleTimeframeClick(30)}
          style={{
            backgroundColor:
              timeframeStatus === 30 &&
              colours[Math.floor(Math.random() * colours.length)],
            color: timeframeStatus === 30 && "black",
            fontSize: timeframeStatus === 30 ? "1.1rem" : "0.9rem",
          }}
        >
          Last 30 days
        </div>
        <div
          className={styles.secondRowTimeframeOptionRight}
          onClick={() => handleTimeframeClick(3650)}
          style={{
            backgroundColor:
              timeframeStatus === 3650 &&
              colours[Math.floor(Math.random() * colours.length)],
            color: timeframeStatus === 3650 && "black",
            fontSize: timeframeStatus === 3650 ? "1.3rem" : "0.9rem",
          }}
        >
          All time
        </div>
      </div>
      <Spacer />
      <div className={styles.globalResultsContainer}>
        <div className={styles.globalResults}>correct</div>
        <div className={styles.globalResults}>incorrect</div>
        <div className={styles.globalResults}>{totalGlobalCount(true)}</div>
        <div className={styles.globalResults}>{totalGlobalCount(false)}</div>
      </div>
      <div className={styles.globalHealth}>health</div>
      <Spacer />
      <div className={styles.globalProgressBarContainer}>
        <ProgressBar
          percent={getGlobalHealth()}
          filledBackground={getColour(getGlobalHealth())}
        >
          <Step>{() => <div className={styles.firstStep}></div>}</Step>
          <Step>
            {() => (
              <div className={styles.standing}>
                {getGlobalHealth() !== "NaN" && getGlobalHealth() !== 0
                  ? getGlobalHealth() + "%"
                  : ""}
              </div>
            )}
          </Step>
          <Step>{() => <div className={styles.indexedStep}></div>}</Step>
        </ProgressBar>
      </div>
      <Spacer />
      <div className={styles.cardContainer} onClick={() => handleClick()}>
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
                            {getLocalHealth(tableIndex) !== "NaN"
                              ? getLocalHealth(tableIndex) + "%"
                              : ""}
                          </div>
                        )}
                      </Step>
                      <Step>
                        {() => <div className={styles.indexedStep}></div>}
                      </Step>
                    </ProgressBar>
                  </div>
                  <Spacer size="0.25rem" />
                  {orderedTableArray(tableIndex).length ? (
                    <>
                      <div className={styles.fact}>Most Common Errors</div>
                      <div className={styles.tableContainer}>
                        <div className={styles.gridEntry}>Ques.</div>
                        <div className={styles.gridEntry}>Correct</div>
                        <div className={styles.gridEntry}>Incorrect</div>
                        {orderedTableArray(tableIndex).map((row) => (
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
      <Spacer />
    </>
  );
};

export default History;
