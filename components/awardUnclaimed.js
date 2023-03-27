import { AiOutlineLock } from "react-icons/ai";
import styles from "../componentStyles/Awards.module.css";

const AwardUnclaimed = (props) => {
  const { fontSize, awardStyle, claimAward, claimIndex } = props;
  return (
    <div
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
      onClick={() => claimAward(claimIndex)}
    >
      <AiOutlineLock />
      <div className={styles.claim}>claim</div>
    </div>
  );
};

export default AwardUnclaimed;
