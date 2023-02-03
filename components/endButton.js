import styles from "../componentStyles/EndButton.module.css";

const EndButton = (props) => {
  const { endGame } = props;
 
  return (
    <>
      <div className={styles.endButton} onClick={endGame}>
        End Game
      </div>
    </>
  );
};

export default EndButton;
