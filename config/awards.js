import { SlBadge } from "react-icons/sl";
import { SiMeteor, SiDungeonsanddragons } from "react-icons/si";
import { FaAward, FaMedal, FaSun } from "react-icons/fa";
import { BsSun, BsStar } from "react-icons/bs";
import {
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
  GiFallingOvoid,
  GiTrophyCup,
  GiLaurelsTrophy,
  GiStarMedal,
  GiFallingBlob,
  GiBurningDot,
  GiSeatedMouse,
  GiGecko,
  GiSeaTurtle,
  GiElephantHead,
  GiSnake,
  GiTigerHead,
} from "react-icons/gi";
import styles from "../componentStyles/Awards.module.css";

export const returnUsageAwards = (fontSize, awardStyle) => [
  <GiSeatedMouse
    className={styles[awardStyle]}
    style={{
      fontSize: fontSize,
    }}
  />,
  <GiGecko
    className={styles[awardStyle]}
    style={{
      fontSize: fontSize,
    }}
  />,
  <GiSeaTurtle
    className={styles[awardStyle]}
    style={{
      fontSize: fontSize,
    }}
  />,
  <GiElephantHead
    className={styles[awardStyle]}
    style={{
      fontSize: fontSize,
    }}
  />,
  <GiSnake
    className={styles[awardStyle]}
    style={{
      fontSize: fontSize,
    }}
  />,
  <GiTigerHead
    className={styles[awardStyle]}
    style={{
      fontSize: fontSize,
    }}
  />,
  <SiDungeonsanddragons
    className={styles[awardStyle]}
    style={{
      fontSize: fontSize,
    }}
  />,
];

export const atcaAwards = (fontSize, awardStyle) => [
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
  <FaMedal
    className={styles[awardStyle]}
    style={{
      fontSize: fontSize,
    }}
  />,
  <GiStarMedal
    className={styles[awardStyle]}
    style={{
      fontSize: fontSize,
    }}
  />,
  <GiTrophyCup
    className={styles[awardStyle]}
    style={{
      fontSize: fontSize,
    }}
  />,
  <GiLaurelsTrophy
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

export const streakEasyAwards = (fontSize, awardStyle) => [
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

export const streakMediumAwards = (fontSize, awardStyle) => [
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

export const streakHardAwards = (fontSize, awardStyle) => [
  <SiMeteor
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
  <GiBurningDot
    className={styles[awardStyle]}
    style={{
      fontSize: fontSize,
    }}
  />,
  <GiFallingBlob
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
];
