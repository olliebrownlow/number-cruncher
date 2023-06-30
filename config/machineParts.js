import Image from "next/image";
import circularSaw from "../public/circularSaw.png";
import bearTrap from "../public/wolfTrap.png";
import furnace from "../public/furnace.png";
import {
  GiPlug,
  GiProcessor,
  GiNeedleDrill,
  GiKeyboard,
  GiBlender,
  GiLaserTurret,
  GiDynamite,
  Gi3DHammer,
} from "react-icons/gi";
import { CgScreen } from "react-icons/cg";
import styles from "../configStyles/MachineParts.module.css";

export const machineParts = [
  {
    icon: (
      <div className={styles.iconImages}>
        <Image
          alt="Furnace"
          src={furnace}
          quality={100}
          height={75}
          width={75}
          priority
        />
      </div>
    ),
    name: "incinerator",
  },
  {
    icon: <Gi3DHammer size={75} color={"darkgrey"} />,
    name: "hammer",
  },
  {
    icon: <CgScreen size={75} color={"lightgrey"} />,
    name: "monitor",
  },
  {
    icon: <GiKeyboard color={"black"} size={75} />,
    name: "keyboard",
  },
  {
    icon: <GiBlender size={75} color={"lightyellow"} />,
    name: "blender",
  },
  {
    icon: <GiNeedleDrill size={75} color={"#A8A9AD"} />,
    name: "drill",
  },
  {
    icon: (
      <div className={styles.iconImages}>
        <Image
          alt="Circular saw"
          src={circularSaw}
          quality={100}
          height={75}
          width={75}
          priority
        />
      </div>
    ),
    name: "circular saw",
  },
  { icon: <GiPlug size={75} />, name: "plug" },
  {
    icon: <GiDynamite size={75} color={"peru"} />,
    name: "dynamite",
  },
  {
    icon: <GiLaserTurret size={75} color={"beige"} />,
    name: "laser gun",
  },
  {
    icon: <GiProcessor size={75} color={"limegreen"} />,
    name: "cpu",
  },
  {
    icon: (
      <div className={styles.iconImages}>
        <Image
          alt="Bear trap"
          src={bearTrap}
          quality={100}
          height={75}
          width={75}
          priority
        />
      </div>
    ),
    name: "bear trap",
  },
];
