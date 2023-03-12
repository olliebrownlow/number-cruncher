import React, { useState, useEffect } from "react";
import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import PageHeading from "../components/pageHeading";
import Spacer from "../components/spacer";
import TimeframeOptions from "../components/timeframeOptions.js";
import GlobalResultsGrid from "../components/globalResultsGrid";
import ProgressHistoryCards from "../components/progressHistoryCards";
import SeeDetailedTableHistory from "../components/seeDetailedTableHistory";
import {
  totalGlobalCount,
  getTotalCountForTable,
  orderedTableArray,
  getGlobalHealth,
  getLocalHealth,
} from "../core/progressHistoryLogic";
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
