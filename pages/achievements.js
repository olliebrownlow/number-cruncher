import { useState } from "react";
import BackButton from "../components/backButton";
import GemCount from "../components/gemCount";
import HomeButton from "../components/homeButton";
import PageHeading from "../components/pageHeading";
import FlowChart from "../components/flowChart";
import AwardGridReturnUser from "../components/awardGridReturnUser";
import AwardGridAtca from "../components/awardGridAtca";
import AwardGridStreakEasy from "../components/awardGridStreakEasy";
import AwardGridStreakMedium from "../components/awardGridStreakMedium";
import AwardGridStreakHard from "../components/awardGridStreakHard";
import HiddenAwardClicks from "../components/hiddenAwardClicks";
import Spacer from "../components/spacer";
import {
  theAwardsFlowChart,
  theChallengesFlowChart,
} from "../config/flowCharts";
import { awardsInfoText, challengesInfoText } from "../config/infoTexts";

const Achievements = () => {
  const [reload, setReload] = useState(0);
  return (
    <>
      <BackButton />
      <GemCount reload={reload} fixedPosition={true} />
      <HomeButton />
      <PageHeading heading={"Awards"} />
      <FlowChart infoText={awardsInfoText} flowChart={theAwardsFlowChart} />
      <AwardGridReturnUser reload={reload} setReload={setReload} />
      <Spacer />
      <AwardGridAtca reload={reload} setReload={setReload} />
      <Spacer />
      <AwardGridStreakEasy reload={reload} setReload={setReload} />
      <Spacer />
      <AwardGridStreakMedium reload={reload} setReload={setReload} />
      <Spacer />
      <AwardGridStreakHard reload={reload} setReload={setReload} />
      <PageHeading heading={"Challenges"} />
      <FlowChart
        infoText={challengesInfoText}
        flowChart={theChallengesFlowChart}
      />
      <HiddenAwardClicks reload={reload} setReload={setReload} />
      <Spacer />
    </>
  );
};

export default Achievements;
