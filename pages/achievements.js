import { useEffect, useState } from "react";
import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import PageHeading from "../components/pageHeading";
import styles from "../styles/Achievements.module.css";

const Achievements = () => {
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    const numCorrectAnswers = parseInt(
      localStorage.getItem("achCorrectAnswers")
    );
    setCorrectAnswers(numCorrectAnswers);
  }, []);

  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"Achievements"} />
      <div>{correctAnswers}</div>
    </>
  );
};

export default Achievements;
