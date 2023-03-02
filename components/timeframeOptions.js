import styles from "../componentStyles/TimeframeOptions.module.css";
import colours from "../config/colours";
import progressHistoryTimeframeOptions from "../config/progressHistoryTimeframeOptions";

const TimeframeOptions = (props) => {
  const { timeframeStatus, handleTimeframeClick } = props;

  return (
    <div className={styles.timeframeGrid}>
      {progressHistoryTimeframeOptions.map((option) => (
        <div
          key={option.timeframeValue}
          className={option.timeframeStyle}
          onClick={() => handleTimeframeClick(option.timeframeValue)}
          style={
            timeframeStatus === option.timeframeValue
              ? {
                  backgroundColor:
                    colours[Math.floor(Math.random() * colours.length)],
                  color: "black",
                  fontSize: "1.2rem",
                }
              : {}
          }
        >
          {option.buttonText}
        </div>
      ))}
    </div>
  );
};

export default TimeframeOptions;
