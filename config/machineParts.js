import {
  GiCircularSawblade,
  GiPlug,
  GiProcessor,
  GiFurnace,
  GiNeedleDrill,
  GiKeyboard,
  GiBlender,
  GiWolfTrap,
  GiLaserTurret,
  GiDynamite,
  Gi3DHammer,
} from "react-icons/gi";
import { CgScreen } from "react-icons/cg";

export const machineParts = [
  {
    icon: <GiFurnace size={75} color={"coral"} />,
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
    icon: <GiCircularSawblade size={75} color={"#A8A9AD"} />,
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
    icon: <GiWolfTrap size={75} color={"#A8A9AD"} />,
    name: "trap",
  },
];
