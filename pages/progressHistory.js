import React, { useState, useEffect } from "react";
import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import PageHeading from "../components/pageHeading";
import Spacer from "../components/spacer";
import TimeframeOptions from "../components/timeframeOptions.js";
import GlobalResultsGrid from "../components/globalResultsGrid";
import ProgressHistoryCards from "../components/progressHistoryCards";
import SeeDetailedTableHistory from "../components/seeDetailedTableHistory";
import { getColour } from "../utils/getColour";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import styles from "../styles/ProgressHistory.module.css";

const ProgressHistory = () => {

  const [refresh, setRefresh] = useState(0);
  const [timeframeStatus, setTimeframeStatus] = useState(0);
  const [showTableHistory, setShowTableHistory] = useState(false);
  const [tableModalIndex, setTableModalIndex] = useState(0);

  useEffect(() => {
    setTimeframeStatus(JSON.parse(sessionStorage.getItem("timeframe")));
  }, []);

  const closeTableHistoryModal = () => {
    setShowTableHistory(false);
  };

  // close modal from window surrounding the modal itself
  const tableHistoryWindowOnClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowTableHistory(false);
    }
  };

  const handleClick = (tableIndex) => {
    setRefresh(refresh + 1);
    setShowTableHistory(true);
    setTableModalIndex(tableIndex);
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

  const orderedTableArray = (tableIndex, splicer, showAll) => {
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
        if (showAll) {
          arr.push([multiplier, correct, incorrect]);
        } else {
          if (incorrect) {
            arr.push([multiplier, correct, incorrect]);
            arr.sort(function (a, b) {
              return b[2] - a[2];
            });
          }
        }
      });
    }
    return arr.splice(0, splicer);
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

  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"Progress history"} />
      <TimeframeOptions
        timeframeStatus={timeframeStatus}
        handleTimeframeClick={handleTimeframeClick}
      />
      <Spacer />
      <GlobalResultsGrid totalGlobalCount={totalGlobalCount} />
      <div className={styles.globalHealth}>health</div>
      <Spacer size={"0.75rem"} />
      <div className={styles.globalProgressBarContainer}>
        <ProgressBar
          percent={getGlobalHealth()}
          filledBackground={getColour(getGlobalHealth())}
          unfilledBackground={getGlobalHealth() === "0" ? "red" : ""}
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
      <ProgressHistoryCards
        getTotalCountForTable={getTotalCountForTable}
        handleClick={handleClick}
        getLocalHealth={getLocalHealth}
        orderedTableArray={orderedTableArray}
      />
      {totalGlobalCount(true) === 0 && totalGlobalCount(false) === 0 && (
        <div className={styles.noProgress}>
          No progess history. Start practising to see something here.
        </div>
      )}
      <Spacer />
      {showTableHistory && (
        <SeeDetailedTableHistory
          closeModal={closeTableHistoryModal}
          windowOnClick={tableHistoryWindowOnClick}
          tableIndex={tableModalIndex}
          getTotalCountForTable={getTotalCountForTable}
          getLocalHealth={getLocalHealth}
          orderedTableArray={orderedTableArray}
          getColour={getColour}
        />
      )}
    </>
  );
};

export default ProgressHistory;
