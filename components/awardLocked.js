import { AiOutlineLock } from "react-icons/ai";
import styles from "../componentStyles/Awards.module.css";

const AwardLocked = (props) => {
  const { fontSize, correctAnswerGoal, awardStyle, targetStyle } = props;
  return (
    <>
      <div
        className={styles[awardStyle]}
        style={{
          fontSize: fontSize,
        }}
      >
        <AiOutlineLock />
        <div className={styles[targetStyle]}>{correctAnswerGoal}</div>
      </div>
    </>
  );
};

export default AwardLocked;
