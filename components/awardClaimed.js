import { SlBadge } from "react-icons/sl";
import { SiMeteor } from "react-icons/si";
import { FaAward, FaMedal, FaSun } from "react-icons/fa";
import { BiMedal, BiMeteor } from "react-icons/bi";
import { BsTrophy, BsSun, BsStar } from "react-icons/bs";
import {
  GiTrophy,
  GiBarbedSun,
  GiSun,
  GiHeraldicSun,
  GiSundial,
  GiDiamondTrophy,
  GiUbisoftSun,
  GiStarFormation,
  GiStarSwirl,
  GiJusticeStar,
  GiBeveledStar,
  GiPolarStar,
  GiMoebiusStar,
  GiFragmentedMeteor,
  GiBurningMeteor,
  GiCometSpark,
  GiFireDash,
  GiUnfriendlyFire,
  GiFallingOvoid,
} from "react-icons/gi";
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
      case "streakEasyAwards":
        return streakEasyAwards;
      case "streakMediumAwards":
        return streakMediumAwards;
      case "streakHardAwards":
        return streakHardAwards;
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

  const streakEasyAwards = [
    <BsSun
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <FaSun
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <GiSun
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <GiBarbedSun
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <GiUbisoftSun
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <GiHeraldicSun
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <GiSundial
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
  ];

  const streakMediumAwards = [
    <BsStar
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <GiStarFormation
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <GiJusticeStar
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <GiBeveledStar
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <GiPolarStar
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <GiMoebiusStar
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <GiStarSwirl
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
  ];

  const streakHardAwards = [
    <SiMeteor
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <BiMeteor
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <GiFragmentedMeteor
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <GiCometSpark
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <GiBurningMeteor
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <GiFallingOvoid
      className={styles[awardStyle]}
      style={{
        fontSize: fontSize,
      }}
    />,
    <GiUnfriendlyFire
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
