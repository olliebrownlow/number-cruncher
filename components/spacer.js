import styles from "../componentStyles/Spacer.module.css";

const Spacer = (props) => {
  const { size } = props;
  return (
    <>
      <div
        className={styles.spacer}
        style={{
          padding: size,
        }}
      ></div>
    </>
  );
};

export default Spacer;
