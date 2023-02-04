import styles from "../componentStyles/FilterButton.module.css";

const FilterButton = (props) => {
  const { hasAtLeastOneRightAndOneWrong, toggleFilter, isFiltered } = props;
  return (
    <>
      {hasAtLeastOneRightAndOneWrong() && (
        <div className={styles.filterButton} onClick={() => toggleFilter()}>
          {isFiltered ? "see all answers" : "see incorrect only"}
        </div>
      )}
    </>
  );
};

export default FilterButton;
