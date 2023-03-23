import styles from "../componentStyles/GameRules.module.css";

const GameRules = (props) => {
  const { gameType } = props;

  const getGameRules = () => {
    switch (gameType) {
      case "practice-mode":
        return [
          {
            Aim: "Answer as many correctly as you can.",
            "Tip one": "End the game at any point using the game end button.",
            "Tip two": "Correct answers count towards gaining achievement awards.",
          },
        ];
      case "streak-challenge":
        return [
          {
            Aim:
              "Set best streaks by getting as many answers correct in a row as you can.",
            Rule: "The game ends when you get one wrong.",
            Tip:
              "Only streaks on easy, medium and hard times table settings count towards gaining streak achievement awards.",
          },
        ];
      default:
        return [{}];
    }
  };
  return (
    <>
      <div className={styles.rulesGrid}>
        {Object.keys(getGameRules()[0]).map((keyName, index) => (
          <div key={index}>
            <div
              className={styles.rulesNumber + ` ${styles.fadeIn}`}
              style={{
                animationDelay: `${(index + 1) * 100}ms`,
                WebkitAnimationDelay: `${(index + 1) * 100}ms`,
              }}
            >
              • {keyName} •
            </div>
            <div
              className={styles.rulesCell + ` ${styles.fadeIn}`}
              style={{
                animationDelay: `${(index + 1) * 100}ms`,
                WebkitAnimationDelay: `${(index + 1) * 100}ms`,
              }}
            >
              {getGameRules()[0][keyName]}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GameRules;
