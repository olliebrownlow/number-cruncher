import { useEffect, useState } from "react";
import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import PageHeading from "../components/pageHeading";
import SubHeading from "../components/subHeading";
import AwardGridAtca from "../components/awardGridAtca";
import Spacer from "../components/spacer";
import correctAnswerGoals from "../config/correctAnswerGoals";

const Achievements = () => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentGoal, setCurrentGoal] = useState(50);
  const [refresh, setRefresh] = useState(0);
  const [aTCAClaimed, setATCAClaimed] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const numCorrectAnswers = parseInt(
      localStorage.getItem("achCorrectAnswers")
    );
    setCorrectAnswers(numCorrectAnswers);

    const reducer = (numCorrectAnswers) => {
      return function (element) {
        return element > numCorrectAnswers;
      };
    };
    const reducedGoals = correctAnswerGoals.filter(reducer(numCorrectAnswers));
    setCurrentGoal(reducedGoals[0]);
    const isATCAClaimed = JSON.parse(localStorage.getItem("isATCAClaimed"));
    setATCAClaimed(isATCAClaimed);
  }, [refresh]);

  const getPercent = () => {
    return (correctAnswers / currentGoal) * 100;
  };

  const claimAward = (index) => {
    setShowCelebration(true);
    const isATCAClaimedArray = JSON.parse(
      localStorage.getItem("isATCAClaimed")
    );
    isATCAClaimedArray[index] = true;
    localStorage.setItem("isATCAClaimed", JSON.stringify(isATCAClaimedArray));
    setIndex(index);
    setATCAClaimed(isATCAClaimedArray);
  };

  const closeCelebrationModal = () => {
    setShowCelebration(false);
  };

  // close modal from window surrounding the modal itself
  const celebrationWindowOnClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowCelebration(false);
    }
  };

  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"Achievements"} />
      <SubHeading subheading={"All-time correct answers"} position={"center"} />
      <Spacer size={"0.5rem"} />
      <SubHeading subheading={"Your awards"} position={"left"} />
      <Spacer size={"0.5rem"} />
      <AwardGridAtca
        currentGoal={currentGoal}
        aTCAClaimed={aTCAClaimed}
        claimAward={claimAward}
        getPercent={getPercent}
        correctAnswers={correctAnswers}
        refresh={refresh}
        setRefresh={setRefresh}
        setATCAClaimed={setATCAClaimed}
        showCelebration={showCelebration}
        closeCelebrationModal={closeCelebrationModal}
        celebrationWindowOnClick={celebrationWindowOnClick}
        index={index}
      />
    </>
  );
};

export default Achievements;
