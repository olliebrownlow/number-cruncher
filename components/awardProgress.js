import Spacer from "./spacer";
import { getColour } from "../utils/getColour";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import styles from "../componentStyles/Awards.module.css";

const AwardProgress = (props) => {
  const { getPercent, correctAnswers, currentGoal } = props;
  return (
    <>
      <Spacer size={"2.5rem"} />
      <div className={styles.container}>
        <ProgressBar
          filledBackground={getColour(getPercent())}
          percent={getPercent()}
        >
          <Step>{() => <div></div>}</Step>
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
    </>
  );
};

export default AwardProgress;
