import { useState, useEffect } from "react";
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
  const [colour, setColour] = useState("");

  useEffect(() => {
    getColour(getHealth());
  }, []);

  const handleClick = () => {
    setRefresh(refresh + 1);
  };

  const totalGlobalCount = (isCorrect) => {
    if (typeof window !== "undefined") {
      const storage = JSON.parse(localStorage.getItem("historyInfo"));
      let total = 0;

      for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
          const count = storage[i][j].filter((x) => x === isCorrect).length;
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
        const count = storage[tableIndex][i].filter((x) => x === isCorrect)
          .length;
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
        const correct = element.filter((x) => x === true).length;
        const incorrect = element.filter((x) => x === false).length;
        arr.push([multiplier, correct, incorrect]);
      });
    }
    arr.sort(function (a, b) {
      return b[2] - a[2];
    });
    return arr.splice(0, 5);
  };

  const getHealth = () => {
    return (
      (totalGlobalCount(true) /
        (totalGlobalCount(false) + totalGlobalCount(true))) *
      100
    ).toFixed(0);
  };

  const getColour = (health) => {
    switch (true) {
      case health >= 95:
        setColour("#008000");
        break;
      case health >= 86:
        setColour("#469200");
        break;
      case health >= 77:
        setColour("#71a300");
        break;
      case health >= 68:
        setColour("#9ab400");
        break;
      case health >= 59:
        setColour("#c4c400");
        break;
      case health >= 50:
        setColour("#d8bf00");
        break;
      case health >= 41:
        setColour("#ecba00");
        break;
      case health >= 32:
        setColour("#ffb300");
        break;
      case health >= 23:
        setColour("#ff9700");
        break;
      case health >= 14:
        setColour("#ff7700");
        break;
      case health >= 5:
        setColour("#ff5100");
        break;
      default:
        setColour("#ff0000");
    }
  };

  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"History"} />
      <div className={styles.globalResultsContainer}>
        <div className={styles.globalResults}>total correct</div>
        <div className={styles.globalResults}>total incorrect</div>
        <div className={styles.globalResults}>{totalGlobalCount(true)}</div>
        <div className={styles.globalResults}>{totalGlobalCount(false)}</div>
      </div>
      <div className={styles.globalHealth}>health</div>
      <Spacer />
      <div className={styles.container}>
        <ProgressBar percent={getHealth()} filledBackground={colour}>
          <Step>{() => <div className={styles.firstStep}></div>}</Step>
          <Step>
            {() => (
              <div className={styles.standing}>
                {getHealth() !== "NaN" ? getHealth() + "%" : ""}
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
              {getTotalCountForTable(tableIndex, true) ||
              getTotalCountForTable(tableIndex, false) ? (
                <>
                  <div className={styles.fact}>correct answers</div>
                  <div
                    className={styles.fact}
                    style={{
                      fontWeight: "900",
                    }}
                  >
                    {getTotalCountForTable(tableIndex, true)}
                  </div>
                  <div className={styles.fact}>incorrect answers</div>
                  <div
                    className={styles.fact}
                    style={{
                      fontWeight: "900",
                    }}
                  >
                    {getTotalCountForTable(tableIndex, false)}
                  </div>
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
                </>
              ) : (
                <div className={styles.noDataContainer}>
                  <div className={styles.noData}>
                    No questions answered - start playing to see your history
                  </div>
                </div>
              )}
            </div>
          </>
        ))}
      </div>
      <Spacer />
    </>
  );
};

export default History;
