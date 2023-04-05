import { getAwards } from "../utils/getAwards";
import styles from "../componentStyles/Awards.module.css";

const AwardClaimed = (props) => {
  const {
    fontSize,
    correctAnswerGoal,
    awardStyle,
    targetStyle,
    awardType,
    awardIndex,
  } = props;

  return (
    <div>
      {getAwards(awardType, fontSize, awardStyle)[awardIndex]}
      <div className={styles[targetStyle]}>{correctAnswerGoal}</div>
    </div>
  );
};

export default AwardClaimed;
