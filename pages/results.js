import { useState, useEffect } from "react";
import HomeButton from "../components/homeButton";
import BackButton from "../components/backButton";
import PageHeading from "../components/pageHeading";
import ResultStatement from "../components/resultStatement";
import FilterButton from "../components/filterButton";
import ResultsQAndAsGrid from "../components/resultsQAndAsGrid";
import Spacer from "../components/spacer";

const Results = () => {
  const [qAndAs, setQAndAs] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    setQAndAs(JSON.parse(sessionStorage.getItem("prevQuestionAnswersArray")));
  }, []);

  const toggleFilter = () => {
    setIsFiltered(!isFiltered);
  };

  const getIncorrectQandAs = () => {
    return qAndAs.filter((qAndA) => !qAndA.isCorrect);
  };

  const hasAtLeastOneRightAndOneWrong = () => {
    const allCorrect = qAndAs.filter((qAndA) => !qAndA.isCorrect).length === 0;
    const allIncorrect = qAndAs.filter((qAndA) => qAndA.isCorrect).length === 0;
    if (allCorrect || allIncorrect) {
      return false;
    }
    return true;
  };

  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"Practice Mode Results"} />
      <ResultStatement />
      <Spacer />
      <FilterButton
        hasAtLeastOneRightAndOneWrong={hasAtLeastOneRightAndOneWrong}
        toggleFilter={toggleFilter}
        isFiltered={isFiltered}
      />
      <Spacer />
      {!isFiltered ? (
        <ResultsQAndAsGrid resultsQAndAsToMap={qAndAs} />
      ) : (
        <ResultsQAndAsGrid resultsQAndAsToMap={getIncorrectQandAs()} />
      )}
      <Spacer />
    </>
  );
};

export default Results;
