import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import PageHeading from "../components/pageHeading";
import styles from "../styles/History.module.css";

const History = () => {
  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"History"} />
    </>
  );
};

export default History;
