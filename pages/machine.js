import { useEffect, useState } from "react";
import PageHeading from "../components/pageHeading";
import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import SubHeading from "../components/subHeading";
import Spacer from "../components/spacer";
import FlowChart from "../components/flowChart";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";
import styles from "../styles/Machine.module.css";
import { machineParts } from "../config/machineParts";
import { theNumberCruncherflowChart } from "../config/flowCharts";
import { theNumberCruncherInfoText } from "../config/infoTexts";

const Machine = () => {
  const [machinePartClaimed, setMachinePartClaimed] = useState([]);

  useEffect(() => {
    const isMachinePartClaimed = JSON.parse(
      localStorage.getItem("isMachinePartClaimed")
    );
    setMachinePartClaimed(isMachinePartClaimed);
  }, []);

  const handleBuild = () => {
    toast.custom(
      <div className={styles.toast} onClick={() => toast.remove()}>
        <ImCross color={"red"} />
        <div>Uh oh!</div>
        <div>Not enough machine parts</div>
        <div className={styles.instruction}>
          Collect them all to build the machine
        </div>
      </div>,
      {
        id: "buildMachine",
      }
    );
  };

  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"The Number Cruncher"} />
      <FlowChart
        infoText={theNumberCruncherInfoText}
        flowChart={theNumberCruncherflowChart}
      />
      <SubHeading subheading={"Machine parts"} fontSize={"2rem"} />
      <Spacer size={"0.75rem"} />
      <div className={styles.machinePartGrid}>
        {machineParts.map((part, index) => (
          <div
            className={styles.machinePart}
            key={index}
            style={{
              border: machinePartClaimed[index]
                ? "solid white"
                : "solid lightgrey",
              borderWidth: machinePartClaimed[index]
                ? "3px 4px 5px 4px"
                : "1px 2px 3px 2px",
            }}
          >
            <div className={styles.partLabel}>Part {index + 1}</div>
            <Spacer size={"0.25rem"} />
            <div
              style={{
                filter: !machinePartClaimed[index] && "blur(10px)",
              }}
            >
              <div>{part.icon}</div>
              <div className={styles.partLabel}>{part.name}</div>
            </div>
          </div>
        ))}
      </div>
      <Spacer size={"1.25rem"} />
      <div className={styles.buildButton} onClick={() => handleBuild()}>
        Build the machine
      </div>
      <Spacer size={"1.25rem"} />
    </>
  );
};

export default Machine;
