import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import PageHeading from "../components/pageHeading";
import UnderConstruction from "../components/underConstruction";

const Journey = () => {
  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"Journey"} />
      <UnderConstruction />
    </>
  );
};

export default Journey;
