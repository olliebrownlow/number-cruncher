import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import "../styles/globals.css";
import ErrorBoundary from "../components/error-boundary";
import historyInfo from "../config/historyInfo";
import bestStreaksByDifficulty from "../config/bestStreaksByDifficulty";
import { Toaster } from "react-hot-toast";
import { AlertTriangle, Award } from "react-feather";
import styles from "../styles/AppLayout.module.css";
import chalkboard from "../public/chalkboard.jpg";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("achCorrectAnswers") === null) {
      localStorage.setItem("achCorrectAnswers", 0);
    }
    if (localStorage.getItem("isATCAClaimed") === null) {
      const isATCAClaimed = [false, false, false, false, false, false, false];
      localStorage.setItem("isATCAClaimed", JSON.stringify(isATCAClaimed));
    }
    if (localStorage.getItem("historyInfo") === null) {
      localStorage.setItem("historyInfo", JSON.stringify(historyInfo));
    }
    if (localStorage.getItem("bestStreaksByDifficulty") === null) {
      localStorage.setItem(
        "bestStreaksByDifficulty",
        JSON.stringify(bestStreaksByDifficulty)
      );
    }
    // check if we have an un-added new top 3 streak and add it if necessary
    const bestStreakReserve = JSON.parse(
      localStorage.getItem("bestStreakReserve")
    );
    // check location - we dont want to add it if we're playing streak challenge
    const locationArray = location.href.split("/");
    const isPlayingStreak = locationArray.indexOf("streak-challenge") >= 0;
    if (!isPlayingStreak && bestStreakReserve && !bestStreakReserve.added) {
      const bestStreaksByDifficulty = JSON.parse(
        localStorage.getItem("bestStreaksByDifficulty")
      );
      // push new streak
      bestStreaksByDifficulty[bestStreakReserve.level].push(
        bestStreakReserve.streak
      );
      // order descending
      bestStreaksByDifficulty[bestStreakReserve.level].sort(function (a, b) {
        return b - a;
      });
      // remove lowest
      bestStreaksByDifficulty[bestStreakReserve.level].pop();
      // resave back to local storage
      localStorage.setItem(
        "bestStreaksByDifficulty",
        JSON.stringify(bestStreaksByDifficulty)
      );
      // mark streak as added
      bestStreakReserve.added = true;
      localStorage.setItem(
        "bestStreakReserve",
        JSON.stringify(bestStreakReserve)
      );
    }
    router.prefetch("/achievements");
  }, []);

  return (
    <>
      <Head>
        <title>NumberCruncher</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin+Sketch&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className={styles.main}>
        <ErrorBoundary>
          <Component {...pageProps} />
          <Analytics />
        </ErrorBoundary>
        <div className={styles.bgWrap}>
          <Image
            alt="chalkboard"
            src={chalkboard}
            quality={100}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </main>
      <Toaster
        toastOptions={{
          style: {
            textAlign: "center",
            fontSize: "1.5rem",
          },
          error: {
            icon: <AlertTriangle color="red" size="50px" />,
          },
          success: {
            icon: <Award color="gold" size="190px" />,
            style: {
              background: "dimgrey",
              color: "white",
            },
            duration: 5000,
          },
        }}
      />
    </>
  );
}
