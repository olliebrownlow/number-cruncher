import React from "react";
import ReactDOM from "react-dom";
import Spacer from "../components/spacer";
import Image from "next/image";
import chalkboard from "../public/modalChalkboard2.jpg";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import colours from "../config/colours";
import styles from "../componentStyles/SeeDetailedTableHistory.module.css";

const SeeDetailedTableHistory = (props) => {
  const {
    closeModal,
    windowOnClick,
    tableIndex,
    getTotalCountForTable,
    getLocalHealth,
    orderedTableArray,
    getColour,
  } = props;

  const getHealth = (row) => {
    return ((row[1] / (row[1] + row[2])) * 100).toFixed(0);
  };

  return ReactDOM.createPortal(
    <aside
      className={styles.modalCover + ` ${styles.fadeIn}`}
      onClick={windowOnClick}
    >
      <div className={styles.modalArea}>
        <div className={styles.bgWrap}>
          <Image
            alt="chalkboard"
            src={chalkboard}
            quality={100}
            fill
            priority
          />
        </div>
        <Spacer size={"0.75rem"} />
        <div
          className={styles.text}
          style={{
            color: colours[Math.floor(Math.random() * colours.length)],
          }}
        >
          {tableIndex + 1} Times Table
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
        <div className={styles.mainLocalProgressBarContainer}>
          <ProgressBar
            percent={getLocalHealth(tableIndex)}
            filledBackground={getColour(getLocalHealth(tableIndex))}
            unfilledBackground={getLocalHealth(tableIndex) === "0" ? "red" : ""}
            height={10}
          >
            <Step>{() => <div className={styles.firstStep}></div>}</Step>
            <Step>
              {() => (
                <div className={styles.mainStanding}>
                  {getLocalHealth(tableIndex) + "%"}
                </div>
              )}
            </Step>
            <Step>{() => <div className={styles.indexedStep}></div>}</Step>
          </ProgressBar>
        </div>
        <Spacer size={"0.5rem"} />
        <div className={styles.tableContainer}>
          <div className={styles.gridEntry}>Ques</div>
          <div className={styles.gridEntry}>Correct</div>
          <div className={styles.gridEntry}>Incorrect</div>
          <div className={styles.gridEntry}>Health</div>
          {orderedTableArray(tableIndex, 12, true).map((row) => (
            <React.Fragment key={row}>
              <div
                className={styles.gridEntry}
                style={{
                  fontWeight: row[0] % 2 === 0 ? "" : "900",
                }}
              >
                {tableIndex + 1} × {row[0]}
              </div>
              <div
                className={styles.gridEntry}
                style={{
                  fontWeight: row[0] % 2 === 0 ? "" : "900",
                }}
              >
                {row[1]}
              </div>
              <div
                className={styles.gridEntry}
                style={{
                  fontWeight: row[0] % 2 === 0 ? "" : "900",
                }}
              >
                {row[2]}
              </div>
              <div className={styles.localProgressBarContainer}>
                <ProgressBar
                  percent={getHealth(row)}
                  filledBackground={getColour(getHealth(row))}
                  unfilledBackground={getHealth(row) === "0" ? "red" : ""}
                  height={5}
                >
                  <Step>{() => <div className={styles.firstStep}></div>}</Step>
                  <Step>
                    {() => (
                      <div className={styles.standing}>
                        {getHealth(row) !== "NaN" ? getHealth(row) + "%" : ""}
                      </div>
                    )}
                  </Step>
                  <Step>
                    {() => <div className={styles.indexedStep}></div>}
                  </Step>
                </ProgressBar>
              </div>
            </React.Fragment>
          ))}
        </div>
        <Spacer />
        <div className={styles.button}>
          <div className={styles.closeButton} onClick={closeModal}>
            Close
          </div>
        </div>
      </div>
    </aside>,
    document.body
  );
};

export default SeeDetailedTableHistory;
