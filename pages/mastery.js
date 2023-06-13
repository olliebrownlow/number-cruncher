import { useState } from "react";
import Image from "next/image";
import eggm from "../public/overlord2.png";
import sleepy from "../public/sleepy.png";
import robe from "../public/robe2.png";
import crown from "../public/queen-crown.png";
import king from "../public/throne-king.png";
import HomeButton from "../components/homeButton";
import BackButton from "../components/backButton";
import PageHeading from "../components/pageHeading";
import Spacer from "../components/spacer";
import FlowChart from "../components/flowChart";
import { masteryFlowChart } from "../config/flowCharts";
import { masteryInfoText } from "../config/infoTexts";
import SubHeading from "../components/subHeading";
import { getColour } from "../utils/getColour";
import { masterySkillLevels } from "../config/masteryGoals";
import {
  getTotalCorrectForTable,
  getSkillPercentage,
} from "../core/masteryLogic";
import {
  GiThroneKing,
  GiOverlordHelm,
  GiQueenCrown,
  GiRobe,
  GiSleepy,
} from "react-icons/gi";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import styles from "../styles/Mastery.module.css";

let initialLevels;
if (typeof window !== "undefined") {
  initialLevels = JSON.parse(localStorage.getItem("skillLevelsForTables"));
}

const Mastery = () => {
  const [skillLevelsForTables, setSkillLevelsForTables] = useState(
    initialLevels
  );

  const skillLevelNamesAndIcons = (size) => [
    ["Sleeping noob", <GiSleepy size={size} />],
    ["Emerging leader", <GiRobe size={size} />],
    ["Bombastic caesar", <GiQueenCrown size={size} />],
    ["Rising overlord", <GiThroneKing size={size} />],
    [
      "Evil genius grand master",
      <GiOverlordHelm size={size} />,
      // <div className={styles.container}>
      //   <Image
      //     alt="Evil genius grand master"
      //     src={eggm}
      //     quality={100}
      //     height={size}
      //     width={size}
      //     priority
      //   />
      // </div>,
    ],
  ];

  const getAllTablesAtSkillLevel = (skillLevel) => {
    if (typeof window !== "undefined") {
      let set = [];
      skillLevelsForTables.map((val, index) => {
        if (val === skillLevel) {
          set.push(index + 1);
        }
      });
      return set;
    }
  };

  const updateSkillLevelForTable = (accomplished, index, newValue) => {
    if (accomplished) {
      const newLevels = skillLevelsForTables.map((oldValue, ind) => {
        if (accomplished && ind === index) {
          return newValue;
        } else {
          return oldValue;
        }
      });
      setSkillLevelsForTables(newLevels);
      localStorage.setItem("skillLevelsForTables", JSON.stringify(newLevels));
    }
  };

  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"Times table Mastery"} />
      <FlowChart infoText={masteryInfoText} flowChart={masteryFlowChart} />
      <SubHeading subheading={"Quick level check"} fontSize={"1.5rem"} />
      <Spacer size={"0.25rem"} />
      <div className={styles.levelCheck}>
        {skillLevelNamesAndIcons(40).map((level, index) => (
          <div key={index}>{level[1]}</div>
        ))}
      </div>
      <div className={styles.levelCheck}>
        {skillLevelNamesAndIcons(40).map((level, index) => (
          <div key={index} className={styles.tableList}>
            {typeof window !== "undefined" &&
              getAllTablesAtSkillLevel(level[0]).map((el, ind) => (
                <div key={ind} className={styles.table}>
                  {el}
                </div>
              ))}
          </div>
        ))}
      </div>
      <Spacer size={"0.75rem"} />
      {masterySkillLevels.map((table, index) => (
        <>
          {getTotalCorrectForTable(index) < table[4] && (
            <div className={styles.key} key={index}>
              <SubHeading
                subheading={`${index + 1} × table`}
                fontSize={"1.5rem"}
              />
              <Spacer size={"0.25rem"} />
              <div className={styles.skillLevel}>
                • {typeof window !== "undefined" && skillLevelsForTables[index]}{" "}
                •
              </div>
              <div className={styles.tableTotal}>
                {getTotalCorrectForTable(index)}
              </div>
              <Spacer size={"1.75rem"} />
              <div className={styles.globalProgressBarContainer}>
                <ProgressBar
                  percent={getSkillPercentage(index, table[4])}
                  filledBackground={getColour(
                    getSkillPercentage(index, table[4])
                  )}
                >
                  <Step>
                    {(accomplished) => (
                      <>
                        <div
                          className={styles.levelAbove}
                          style={{
                            opacity: accomplished.accomplished ? "1" : "0.5",
                          }}
                        >
                          Sleeping noob
                        </div>
                        <div
                          className={styles.step}
                          style={{
                            opacity: accomplished.accomplished ? "1" : "0.5",
                          }}
                        >
                          <GiSleepy size={24} />
                        </div>
                        <div className={styles.levelBelow}>{table[0]}</div>
                      </>
                    )}
                  </Step>
                  <Step>
                    {(accomplished) => (
                      <>
                        <div
                          className={styles.levelAbove}
                          style={{
                            opacity: accomplished.accomplished ? "1" : "0.5",
                          }}
                        >
                          Emerging leader
                          {typeof window !== "undefined" &&
                            skillLevelsForTables[index] !== "Emerging leader" &&
                            skillLevelsForTables[index] !==
                              "Bombastic caesar" &&
                            skillLevelsForTables[index] !== "Rising overlord" &&
                            skillLevelsForTables[index] !==
                              "Evil genius grand master" &&
                            updateSkillLevelForTable(
                              accomplished.accomplished,
                              index,
                              "Emerging leader"
                            )}
                        </div>
                        <div
                          className={styles.step}
                          style={{
                            opacity: accomplished.accomplished ? "1" : "0.5",
                          }}
                        >
                          <GiRobe size={24} />
                        </div>
                        <div className={styles.levelBelow}>{table[1]}</div>
                      </>
                    )}
                  </Step>
                  <Step>
                    {(accomplished) => (
                      <>
                        <div
                          className={styles.levelAbove}
                          style={{
                            opacity: accomplished.accomplished ? "1" : "0.5",
                          }}
                        >
                          Bombastic caesar
                          {typeof window !== "undefined" &&
                            skillLevelsForTables[index] !==
                              "Bombastic caesar" &&
                            skillLevelsForTables[index] !== "Rising overlord" &&
                            skillLevelsForTables[index] !==
                              "Evil genius grand master" &&
                            updateSkillLevelForTable(
                              accomplished.accomplished,
                              index,
                              "Bombastic caesar"
                            )}
                        </div>
                        <div
                          className={styles.step}
                          style={{
                            opacity: accomplished.accomplished ? "1" : "0.5",
                          }}
                        >
                          <GiQueenCrown size={24} />
                        </div>
                        <div className={styles.levelBelow}>{table[2]}</div>
                      </>
                    )}
                  </Step>
                  <Step>
                    {(accomplished) => (
                      <>
                        <div
                          className={styles.levelAbove}
                          style={{
                            opacity: accomplished.accomplished ? "1" : "0.5",
                          }}
                        >
                          Rising overlord
                          {typeof window !== "undefined" &&
                            skillLevelsForTables[index] !== "Rising overlord" &&
                            skillLevelsForTables[index] !==
                              "Evil genius grand master" &&
                            updateSkillLevelForTable(
                              accomplished.accomplished,
                              index,
                              "Rising overlord"
                            )}
                        </div>
                        <div
                          className={styles.step}
                          style={{
                            opacity: accomplished.accomplished ? "1" : "0.5",
                          }}
                        >
                          <GiThroneKing size={24} />
                        </div>
                        <div className={styles.levelBelow}>{table[3]}</div>
                      </>
                    )}
                  </Step>
                  <Step>
                    {(accomplished) => (
                      <>
                        <div
                          className={styles.levelAbove}
                          style={{
                            opacity: accomplished.accomplished ? "1" : "0.5",
                          }}
                        >
                          Evil genius grand master
                          {typeof window !== "undefined" &&
                            skillLevelsForTables[index] !==
                              "Evil genius grand master" &&
                            updateSkillLevelForTable(
                              accomplished.accomplished,
                              index,
                              "Evil genius grand master"
                            )}
                        </div>
                        <div
                          className={styles.step}
                          style={{
                            opacity: accomplished.accomplished ? "1" : "0.5",
                          }}
                        >
                          <GiOverlordHelm size={24} />
                        </div>
                        <div className={styles.levelBelow}>{table[4]}</div>
                      </>
                    )}
                  </Step>
                </ProgressBar>
              </div>
            </div>
          )}
          {getTotalCorrectForTable(index) >= table[4] && (
            <div className={styles.key} key={index}>
              <div className={styles.area}>
                <SubHeading
                  subheading={`${index + 1} × table mastered`}
                  fontSize={"1.5rem"}
                />
                <div className={styles.container}>
                  <Image
                    alt="evil genius grand master"
                    src={eggm}
                    quality={100}
                    height={200}
                    width={200}
                    priority
                  />
                </div>
                <div className={styles.finalLevel}>
                  Evil genius grand master
                  {typeof window !== "undefined" &&
                    skillLevelsForTables[index] !==
                      "Evil genius grand master" &&
                    updateSkillLevelForTable(
                      true,
                      index,
                      "Evil genius grand master"
                    )}
                </div>
                <div className={styles.tableTotal}>
                  {getTotalCorrectForTable(index)}
                </div>
              </div>
            </div>
          )}
          <Spacer size={"2rem"} />
        </>
      ))}
    </>
  );
};

export default Mastery;
