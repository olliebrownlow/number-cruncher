import { SlBadge } from "react-icons/sl";
import { FaAward, FaMedal, FaSun } from "react-icons/fa";
import { BiMedal } from "react-icons/bi";
import { BsTrophy, BsSun, BsStar } from "react-icons/bs";
import {
  GiTrophy,
  GiBarbedSun,
  GiSun,
  GiHeraldicSun,
  GiSundial,
  GiDiamondTrophy,
  GiUbisoftSun,
  GiJusticeStar,
  GiStarFormation,
  GiBeveledStar,
  GiPolarStar,
  GiMoebiusStar,
  GiStarSwirl,
} from "react-icons/gi";
import styles from "../componentStyles/CelebrateAwardClaim.module.css";

export const medalIcons = [
  <SlBadge className={styles.medal1 + ` ${styles.fadeInDownDelayed}`} />,
  <FaAward className={styles.medal1 + ` ${styles.fadeInDownDelayed}`} />,
  <BiMedal className={styles.medal2 + ` ${styles.fadeInDownDelayed}`} />,
  <FaMedal className={styles.medal2 + ` ${styles.fadeInDownDelayed}`} />,
  <BsTrophy className={styles.medal3 + ` ${styles.fadeInDownDelayed}`} />,
  <GiTrophy className={styles.medal3 + ` ${styles.fadeInDownDelayed}`} />,
  <GiDiamondTrophy
    className={styles.medal3 + ` ${styles.fadeInDownDelayed}`}
  />,
];

export const sunIcons = [
  <BsSun className={styles.medal1 + ` ${styles.fadeInDownDelayed}`} />,
  <FaSun className={styles.medal1 + ` ${styles.fadeInDownDelayed}`} />,
  <GiSun className={styles.medal2 + ` ${styles.fadeInDownDelayed}`} />,
  <GiBarbedSun className={styles.medal2 + ` ${styles.fadeInDownDelayed}`} />,
  <GiUbisoftSun className={styles.medal3 + ` ${styles.fadeInDownDelayed}`} />,
  <GiHeraldicSun className={styles.medal3 + ` ${styles.fadeInDownDelayed}`} />,
  <GiSundial className={styles.medal3 + ` ${styles.fadeInDownDelayed}`} />,
];

export const starIcons = [
  <BsStar className={styles.medal1 + ` ${styles.fadeInDownDelayed}`} />,
  <GiStarFormation
    className={styles.medal1 + ` ${styles.fadeInDownDelayed}`}
  />,
  <GiJusticeStar className={styles.medal2 + ` ${styles.fadeInDownDelayed}`} />,
  <GiBeveledStar className={styles.medal2 + ` ${styles.fadeInDownDelayed}`} />,
  <GiPolarStar className={styles.medal3 + ` ${styles.fadeInDownDelayed}`} />,
  <GiMoebiusStar className={styles.medal3 + ` ${styles.fadeInDownDelayed}`} />,
  <GiStarSwirl className={styles.medal3 + ` ${styles.fadeInDownDelayed}`} />,
];
