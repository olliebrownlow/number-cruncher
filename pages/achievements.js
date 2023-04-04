import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import PageHeading from "../components/pageHeading";
import AwardGridAtca from "../components/awardGridAtca";
import AwardGridStreakEasy from "../components/awardGridStreakEasy";
import AwardGridStreakMedium from "../components/awardGridStreakMedium";
import AwardGridStreakHard from "../components/awardGridStreakHard";
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
      <AwardGridStreakMedium />
      <Spacer />
      <AwardGridStreakHard />
      <Spacer />
    </>
  );
};

export default Achievements;
