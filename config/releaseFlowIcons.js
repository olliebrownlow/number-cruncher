import { FaLaptopCode, FaLaptopMedical } from "react-icons/fa";
import {
  RiGitMergeLine,
  RiGitBranchLine,
  RiGitPullRequestLine,
} from "react-icons/ri";
import { RxVercelLogo } from "react-icons/rx";
import { MdPhoneIphone, MdTabletMac, MdPhoneAndroid } from "react-icons/md";

const releaseFlowIcons = [
  <FaLaptopMedical size={32} />,
  <RxVercelLogo size={32} style={{ transform: "rotate(180deg)" }} />,
  <RiGitBranchLine size={32} />,
  <MdTabletMac size={32} />,
  <RiGitMergeLine size={32} />,
  <RxVercelLogo size={32} style={{ transform: "rotate(270deg)" }} />,
  <RxVercelLogo size={32} />,
  <MdPhoneAndroid size={32} />,
  <FaLaptopCode size={32} />,
  <RxVercelLogo size={32} style={{ transform: "rotate(90deg)" }} />,
  <MdPhoneIphone size={32} />,
  <RiGitPullRequestLine size={32} />,
];

export default releaseFlowIcons;
