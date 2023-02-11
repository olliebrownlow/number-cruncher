import { useEffect, useState } from "react";
import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import PageHeading from "../components/pageHeading";
import SubHeading from "../components/subHeading";
import Spacer from "../components/spacer";
import ResetAchievementButton from "../components/resetAchievementButton";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import styles from "../styles/Achievements.module.css";

const Achievements = () => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentGoal, setCurrentGoal] = useState(50);
  const [refresh, setRefresh] = useState(0);

  const goals = [10, 25, 100, 250, 1000, 2500, 10000];

  useEffect(() => {
    const numCorrectAnswers = parseInt(
      localStorage.getItem("achCorrectAnswers")
    );
    setCorrectAnswers(numCorrectAnswers);

    const reducer = (numCorrectAnswers) => {
      return function (element) {
        return element > numCorrectAnswers;
      };
    };
    const reducedGoals = goals.filter(reducer(numCorrectAnswers));
    setCurrentGoal(reducedGoals[0]);
  }, [refresh]);

  const getPercent = () => {
    return (correctAnswers / currentGoal) * 100;
  };

  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"Achievements"} />
      <SubHeading subheading={"All-time correct answers:"} />
      <Spacer size={"2rem"} />
      <div className={styles.container}>
        <ProgressBar
          filledBackground="linear-gradient(to right, #90EE90, #006400)"
          percent={getPercent()}
        >
          <Step>{() => <div className={styles.firstStep}></div>}</Step>
          <Step>
            {() => <div className={styles.standing}>{correctAnswers}</div>}
          </Step>
          <Step>
            {() => (
              <div className={styles.indexedStep}>
                <div className={styles.label}>{currentGoal}</div>
              </div>
            )}
          </Step>
        </ProgressBar>
      </div>
      <Spacer />
      <ResetAchievementButton
        achType={"achCorrectAnswers"}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <Spacer />
    </>
  );
};

export default Achievements;
