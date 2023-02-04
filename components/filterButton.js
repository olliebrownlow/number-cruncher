import styles from "../componentStyles/FilterButton.module.css";

const FilterButton = (props) => {
  const { isAtLeastOneRightAndOneWrong, toggleFilter, isFiltered } = props;
  return (
    <>
      {isAtLeastOneRightAndOneWrong() && (
        <div className={styles.filterButton} onClick={() => toggleFilter()}>
          {isFiltered ? "see all answers" : "see incorrect only"}
        </div>
      )}
    </>
  );
};

export default FilterButton;
