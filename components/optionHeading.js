import styles from "../componentStyles/OptionHeading.module.css";

const OptionHeading = (props) => {
  const { optionHeading } = props;
  return (
    <>
      <div className={styles.optionHeading}>{optionHeading}</div>
    </>
  );
};

export default OptionHeading;
