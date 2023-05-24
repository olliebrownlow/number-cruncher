import { useRouter } from "next/router";
import styles from "../componentStyles/SeeMachineButton.module.css";

const SeeMachineButton = () => {
  const router = useRouter();

  const goToMachine = () => {
    router.push("/machine");
  };

  return (
    <>
      <div className={styles.seeMachineButton} onClick={() => goToMachine()}>
        View the machine
      </div>
    </>
  );
};

export default SeeMachineButton;
