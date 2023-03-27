import { SlBadge } from "react-icons/sl";
import { FaAward, FaMedal } from "react-icons/fa";
import { BiMedal } from "react-icons/bi";
import { BsTrophy } from "react-icons/bs";
import { GiTrophy } from "react-icons/gi";
import { GiDiamondTrophy } from "react-icons/gi";
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

  const getAwardType = () => {
    switch (awardType) {
      case "atcaAwards":
        return atcaAwards;
      default:
        return atcaAwards;
    }
  };

  const atcaAwards = [
    <SlBadge
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <FaAward
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <BiMedal
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <FaMedal
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <BsTrophy
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <GiTrophy
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <GiDiamondTrophy
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
  ];

  return (
    <div>
      {getAwardType()[awardIndex]}
      <div className={styles[targetStyle]}>{correctAnswerGoal}</div>
    </div>
  );
};

export default AwardClaimed;
