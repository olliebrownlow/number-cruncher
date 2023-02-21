import { useState } from "react";
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
  const [timeframe, setTimeframe] = useState(3650);

  const handleClick = () => {
    setRefresh(refresh + 1);
  };

  const handleTimeframeClick = (timeframe) => {
    setTimeframe(timeframe);
  };

  const getNumberOfDays = (dateOfRecord) => {
    const date1 = new Date(dateOfRecord);
    const date2 = new Date();
    const oneDayInMS = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDayInMS);
    // same day = 1
    return diffInDays;
  };

  const totalGlobalCount = (isCorrect) => {
    if (typeof window !== "undefined") {
      const storage = JSON.parse(localStorage.getItem("historyInfo"));
      let total = 0;
      for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
          const count = storage[i][j]
            .filter((x) => x[0] === isCorrect)
            .filter((x) => getNumberOfDays(x[1]) <= timeframe).length;
          total = total + count;
        }
      }
      return total;
    }
  };

  const getTotalCountForTable = (tableIndex, isCorrect) => {
    if (typeof window !== "undefined") {
      const storage = JSON.parse(localStorage.getItem("historyInfo"));
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
      const tableHistory = JSON.parse(localStorage.getItem("historyInfo"));
      const tableHistoryArray = tableHistory[tableIndex];
      tableHistoryArray.forEach((element, index) => {
        const multiplier = index + 1;
        const correct = element.filter((x) => x[0] === true).length;
        const incorrect = element.filter((x) => x[0] === false).length;
        arr.push([multiplier, correct, incorrect]);
      });
    }
    arr.sort(function (a, b) {
      return b[2] - a[2];
    });
    return arr.splice(0, 5);
  };

  const getGlobalHealth = () => {
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
      {/* <div>days: {getNumberOfDays("2023-2-21")}</div>
      <div>today: {new Date().toISOString().split("T")[0]}</div> */}
      <div className={styles.timeframeGrid}>
        <div
          className={styles.topRowTimeframeOptionLeft}
          onClick={() => handleTimeframeClick(1)}
        >
          Today
        </div>
        <div
          className={styles.topRowTimeframeOptionRight}
          onClick={() => handleTimeframeClick(2)}
        >
          Last 2 days
        </div>
        <div
          className={styles.secondRowTimeframeOptionLeft}
          onClick={() => handleTimeframeClick(7)}
        >
          Last 7 days
        </div>
        <div
          className={styles.secondRowTimeframeOptionMiddle}
          onClick={() => handleTimeframeClick(30)}
        >
          Last 30 days
        </div>
        <div
          className={styles.secondRowTimeframeOptionRight}
          onClick={() => handleTimeframeClick(3650)}
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
                {getGlobalHealth() !== "NaN" ? getGlobalHealth() + "%" : ""}
              </div>
            )}
          </Step>
          <Step>{() => <div className={styles.indexedStep}></div>}</Step>
        </ProgressBar>
      </div>
      <Spacer />
      <div className={styles.cardContainer} onClick={() => handleClick()}>
        {tableIndexes.map((tableIndex) => (
          <>
            {getTotalCountForTable(tableIndex, true) ||
            getTotalCountForTable(tableIndex, false) ? (
              <>
                <div
                  key={tableIndex}
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
                    <div className={styles.fact}>correct</div>
                    <div className={styles.fact}>incorrect</div>
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
                  <div className={styles.fact}>most common errors</div>
                  <div className={styles.tableContainer}>
                    <div className={styles.gridEntry}>Ques.</div>
                    <div className={styles.gridEntry}>Correct</div>
                    <div className={styles.gridEntry}>Incorrect</div>
                    {orderedTableArray(tableIndex).map((row) => (
                      <>
                        <div className={styles.gridEntry}>
                          {tableIndex + 1} × {row[0]}
                        </div>
                        <div className={styles.gridEntry}>{row[1]}</div>
                        <div className={styles.gridEntry}>{row[2]}</div>
                      </>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        ))}
      </div>
      <Spacer />
    </>
  );
};

export default History;
