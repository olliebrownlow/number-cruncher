import styles from "../componentStyles/TimeframeOptions.module.css";

const progressHistoryTimeframeOptions = [
  {
    timeframeStyle: styles.topRowTimeframeOptionLeft,
    timeframeValue: 1,
    buttonText: "Today",
  },
  {
    timeframeStyle: styles.topRowTimeframeOptionRight,
    timeframeValue: 2,
    buttonText: "Last 2 days",
  },
  {
    timeframeStyle: styles.secondRowTimeframeOptionLeft,
    timeframeValue: 7,
    buttonText: "Last 7 days",
  },
  {
    timeframeStyle: styles.secondRowTimeframeOptionMiddle,
    timeframeValue: 30,
    buttonText: "Last 30 days",
  },
  {
    timeframeStyle: styles.secondRowTimeframeOptionRight,
    timeframeValue: 3650,
    buttonText: "All time",
  },
];

export default progressHistoryTimeframeOptions;
