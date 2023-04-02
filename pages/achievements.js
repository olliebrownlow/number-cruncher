import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import PageHeading from "../components/pageHeading";
import AwardGridStreakEasy from "../components/awardGridStreakEasy";
import AwardGridAtca from "../components/awardGridAtca";
import Spacer from "../components/spacer";

const Achievements = () => {
  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"Achievements"} />
      <AwardGridAtca />
      <Spacer />
      <AwardGridStreakEasy />
      <Spacer />
    </>
  );
};

export default Achievements;
