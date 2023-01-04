import Link from "next/link";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

const Home = (props) => {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.center}>
          <h1 className={styles.heading}>Number Cruncher</h1>
        </div>

        <div className={styles.grid}>
          <Link
            href={{
              pathname: "/game-options",
              query: { gameType: "practice-mode" },
            }}
            className={styles.card}
          >
            <h2 className={inter.className}>
              Practice mode <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Select times tables of your choice and get those brain cells
              working!
            </p>
          </Link>

          <a href="" className={styles.card}>
            <h2 className={inter.className}>
              Streak <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Get one wrong and the streak counter will reset to zero!
            </p>
          </a>

          <a href="" className={styles.card}>
            <h2 className={inter.className}>
              Play the percentages <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Set a question limit and see how many you can get right.
            </p>
          </a>

          <a href="" className={styles.card}>
            <h2 className={inter.className}>
              Against the clock <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Set time limits and compete for top scores. Tick tock tick tock...
            </p>
          </a>

          <a href="" className={styles.card}>
            <h2 className={inter.className}>
              Journey <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Work through levels of increasing difficulty earning rewards as
              you go.
            </p>
          </a>

          <a href="" className={styles.card}>
            <h2 className={inter.className}>
              About <span>-&gt;</span>
            </h2>
            <p className={inter.className}>What, who and why..</p>
          </a>
        </div>
      </main>
    </>
  );
};

export default Home;
