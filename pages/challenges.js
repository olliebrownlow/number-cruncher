import { useState } from "react";
import BackButton from "../components/backButton";
import GemCount from "../components/gemCount";
import HomeButton from "../components/homeButton";
import PageHeading from "../components/pageHeading";
import FlowChart from "../components/flowChart";
import HiddenAwardClicks from "../components/hiddenAwardClicks";
import Spacer from "../components/spacer";
import { theChallengesFlowChart } from "../config/flowCharts";
import { challengesInfoText } from "../config/infoTexts";
import styles from "../styles/Challenges.module.css"
const Challenges = () => {
  const [reload, setReload] = useState(0);
  return (
    <>
      <BackButton />
      <GemCount reload={reload} fixedPosition={true} />
      <HomeButton />
      <PageHeading heading={"Challenges"} />
      <FlowChart
        infoText={challengesInfoText}
        flowChart={theChallengesFlowChart}
      />
      <HiddenAwardClicks reload={reload} setReload={setReload} />
      <Spacer />
      <div className={styles.more}>More coming soon..</div>
      <Spacer />
    </>
  );
};

export default Challenges;
