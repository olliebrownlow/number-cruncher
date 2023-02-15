import { SlBadge } from "react-icons/sl";
import { FaAward, FaMedal } from "react-icons/fa";
import { BiMedal } from "react-icons/bi";
import { BsTrophy } from "react-icons/bs";
import { GiTrophy } from "react-icons/gi";
import { GiDiamondTrophy } from "react-icons/gi";
import styles from "../componentStyles/CelebrateAwardClaim.module.css";

const icons = [
  <SlBadge className={styles.medal1 + ` ${styles.fadeInDownDelayed}`} />,
  <FaAward className={styles.medal1 + ` ${styles.fadeInDownDelayed}`} />,
  <BiMedal className={styles.medal2 + ` ${styles.fadeInDownDelayed}`} />,
  <FaMedal className={styles.medal2 + ` ${styles.fadeInDownDelayed}`} />,
  <BsTrophy className={styles.medal3 + ` ${styles.fadeInDownDelayed}`} />,
  <GiTrophy className={styles.medal3 + ` ${styles.fadeInDownDelayed}`} />,
  <GiDiamondTrophy className={styles.medal3 + ` ${styles.fadeInDownDelayed}`} />,
];

export default icons;
