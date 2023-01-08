import styles from "../componentStyles/PageHeading.module.css";

const PageHeading = (props) => {
  const { heading } = props;
  return (
    <>
      <div className={styles.center}>
        <h1 className={styles.heading}>{heading}</h1>
      </div>
    </>
  );
};

export default PageHeading;
