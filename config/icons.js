import { SlBadge } from "react-icons/sl";
import { SiMeteor } from "react-icons/si";
import { FaAward, FaMedal, FaSun } from "react-icons/fa";
import { BiMeteor } from "react-icons/bi";
import { BsSun, BsStar } from "react-icons/bs";
import {
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
  GiFragmentedMeteor,
  GiCometSpark,
  GiBurningMeteor,
  GiFallingOvoid,
  GiUnfriendlyFire,
  GiStarMedal,
  GiTrophyCup,
  GiLaurelsTrophy,
} from "react-icons/gi";
import styles from "../componentStyles/CelebrateAwardClaim.module.css";

export const medalIcons = [
  <SlBadge className={styles.medal1 + ` ${styles.fadeInDownDelayed}`} />,
  <FaAward className={styles.medal1 + ` ${styles.fadeInDownDelayed}`} />,
  <FaMedal className={styles.medal2 + ` ${styles.fadeInDownDelayed}`} />,
  <GiStarMedal className={styles.medal2 + ` ${styles.fadeInDownDelayed}`} />,
  <GiTrophyCup className={styles.medal3 + ` ${styles.fadeInDownDelayed}`} />,
  <GiLaurelsTrophy
    className={styles.medal3 + ` ${styles.fadeInDownDelayed}`}
  />,
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

export const meteorIcons = [
  <SiMeteor className={styles.medal1 + ` ${styles.fadeInDownDelayed}`} />,
  <BiMeteor className={styles.medal1 + ` ${styles.fadeInDownDelayed}`} />,
  <GiFragmentedMeteor
    className={styles.medal2 + ` ${styles.fadeInDownDelayed}`}
  />,
  <GiCometSpark className={styles.medal2 + ` ${styles.fadeInDownDelayed}`} />,
  <GiBurningMeteor
    className={styles.medal3 + ` ${styles.fadeInDownDelayed}`}
  />,
  <GiFallingOvoid className={styles.medal3 + ` ${styles.fadeInDownDelayed}`} />,
  <GiUnfriendlyFire
    className={styles.medal3 + ` ${styles.fadeInDownDelayed}`}
  />,
];
