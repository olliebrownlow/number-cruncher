import { HiArrowSmDown, HiArrowNarrowRight } from "react-icons/hi";
import styles from "../componentStyles/FlowChart.module.css";
import colours from "../config/colours";

export const theAwardsFlowChart = [
  <>
    <div className={styles.machineInfoCells}>Play the games</div>
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}></div>
  </>,
  <>
    <HiArrowSmDown
      size={25}
      color={colours[Math.floor(Math.random() * colours.length)]}
      className={styles.machineInfoCells}
    />
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}></div>
  </>,
  <>
    <div className={styles.machineInfoCells}>
      Claim awards
      <br />
      and gems
    </div>
    <HiArrowNarrowRight
      size={25}
      color={colours[Math.floor(Math.random() * colours.length)]}
      className={styles.machineInfoCells}
    />
    <div className={styles.machineInfoCells}>
      Unlock more <br /> games & challenges
    </div>
  </>,
  <>
    <HiArrowSmDown
      size={25}
      color={colours[Math.floor(Math.random() * colours.length)]}
      className={styles.machineInfoCells}
    />
    <div className={styles.machineInfoCells}></div>
    <HiArrowSmDown
      size={25}
      color={colours[Math.floor(Math.random() * colours.length)]}
      className={styles.machineInfoCells}
    />
  </>,
  <>
    <div className={styles.machineInfoCells}>
      Can you
      <br />
      get them all?
    </div>
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}>
      Play these games
      <br />
      and challenges
    </div>
  </>,
  <>
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}></div>
    <HiArrowSmDown
      size={25}
      color={colours[Math.floor(Math.random() * colours.length)]}
      className={styles.machineInfoCells}
    />
  </>,
  <>
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}>
      Claim yet more <br /> awards and gems! <br /> etc.
    </div>
  </>,
];

export const theChallengesFlowChart = [
  <>
    <div className={styles.machineInfoCells}>Use gems to unlock</div>
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}></div>
  </>,
  <>
    <HiArrowSmDown
      size={25}
      color={colours[Math.floor(Math.random() * colours.length)]}
      className={styles.machineInfoCells}
    />
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}></div>
  </>,
  <>
    <div className={styles.machineInfoCells}>
      Clues help to
      <br />
      solve tasks
    </div>
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}></div>
  </>,
  <>
    <HiArrowSmDown
      size={25}
      color={colours[Math.floor(Math.random() * colours.length)]}
      className={styles.machineInfoCells}
    />
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}></div>
  </>,
  <>
    <div className={styles.machineInfoCells}>
      Complete the
      <br />
      challenges
    </div>
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}></div>
  </>,
  <>
    <HiArrowSmDown
      size={25}
      color={colours[Math.floor(Math.random() * colours.length)]}
      className={styles.machineInfoCells}
    />
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}></div>
  </>,
  <>
    <div className={styles.machineInfoCells}>
      Collect machine <br /> parts
    </div>
    <HiArrowNarrowRight
      size={25}
      color={colours[Math.floor(Math.random() * colours.length)]}
      className={styles.machineInfoCells}
    />
    <div className={styles.machineInfoCells}>
      Build <br /> the machine
    </div>
  </>,
];

export const theNumberCruncherflowChart = [
  <>
    <div className={styles.machineInfoCells}>Complete challenges</div>
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}></div>
  </>,
  <>
    <HiArrowSmDown
      size={25}
      color={colours[Math.floor(Math.random() * colours.length)]}
      className={styles.machineInfoCells}
    />
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}></div>
  </>,
  <>
    <div className={styles.machineInfoCells}>
      Collect machine
      <br />
      parts
    </div>
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}>
      Master each <br /> times table
    </div>
  </>,
  <>
    <HiArrowSmDown
      size={25}
      color={colours[Math.floor(Math.random() * colours.length)]}
      className={styles.machineInfoCells}
    />
    <div className={styles.machineInfoCells}></div>
    <HiArrowSmDown
      size={25}
      color={colours[Math.floor(Math.random() * colours.length)]}
      className={styles.machineInfoCells}
    />
  </>,
  <>
    <div className={styles.machineInfoCells}>
      Build the
      <br />
      machine
    </div>
    <HiArrowNarrowRight
      size={25}
      color={colours[Math.floor(Math.random() * colours.length)]}
      className={styles.machineInfoCells}
    />
    <div className={styles.machineInfoCells}>
      Put all 12 in
      <br />
      the machine
    </div>
  </>,
  <>
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}></div>
    <HiArrowSmDown
      size={25}
      color={colours[Math.floor(Math.random() * colours.length)]}
      className={styles.machineInfoCells}
    />
  </>,
  <>
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}>Complete the game</div>
  </>,
];

export const masteryFlowChart = [
  <>
    <div className={styles.machineInfoCells}>
      Answer questions <br /> correctly
    </div>
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}></div>
  </>,
  <>
    <HiArrowSmDown
      size={25}
      color={colours[Math.floor(Math.random() * colours.length)]}
      className={styles.machineInfoCells}
    />
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}></div>
  </>,
  <>
    <div className={styles.machineInfoCells}>
      Increase table
      <br />
      skill
    </div>
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}>
      Build the <br /> machine
    </div>
  </>,
  <>
    <HiArrowSmDown
      size={25}
      color={colours[Math.floor(Math.random() * colours.length)]}
      className={styles.machineInfoCells}
    />
    <div className={styles.machineInfoCells}></div>
    <HiArrowSmDown
      size={25}
      color={colours[Math.floor(Math.random() * colours.length)]}
      className={styles.machineInfoCells}
    />
  </>,
  <>
    <div className={styles.machineInfoCells}>
      Achieve full
      <br />
      mastery
    </div>
    <HiArrowNarrowRight
      size={25}
      color={colours[Math.floor(Math.random() * colours.length)]}
      className={styles.machineInfoCells}
    />
    <div className={styles.machineInfoCells}>
      Put all 12 in
      <br />
      the machine
    </div>
  </>,
  <>
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}></div>
    <HiArrowSmDown
      size={25}
      color={colours[Math.floor(Math.random() * colours.length)]}
      className={styles.machineInfoCells}
    />
  </>,
  <>
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}></div>
    <div className={styles.machineInfoCells}>Complete the game</div>
  </>,
];
