import { useState } from "react";
import Spacer from "../components/spacer";
import styles from "../componentStyles/FlowChart.module.css";

const FlowChart = (props) => {
  const { infoText, flowChart } = props;
  const [showFlowChart, setShowFlowChart] = useState(false);

  const toggleShowFlowChart = () => {
    setShowFlowChart(!showFlowChart);
  };

  return (
    <>
      <div
        className={styles.moreInfoButton}
        onClick={() => toggleShowFlowChart()}
      >
        {showFlowChart ? "Less info" : "More info"}
      </div>
      {showFlowChart && (
        <>
          <Spacer size={"0.75rem"} />
          <div
            className={styles.moreInfoTextWrapper + ` ${styles.fadeIn}`}
            style={{
              animationDelay: "50ms",
              WebkitAnimationDelay: "50ms",
            }}
          >
            {infoText}
          </div>
        </>
      )}
      <Spacer size={"0.75rem"} />
      {showFlowChart &&
        flowChart.map((row, index) => (
          <div
            key={index}
            className={styles.moreInfoWrapper + ` ${styles.fadeIn}`}
            style={{
              animationDelay: `${(index + 1) * 50}ms`,
              WebkitAnimationDelay: `${(index + 1) * 50}ms`,
            }}
          >
            {row}
          </div>
        ))}
      <Spacer size={"0.5rem"} />
    </>
  );
};

export default FlowChart;
