import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import "../styles/globals.css";
import ErrorBoundary from "../components/error-boundary";
import historyInfo from "../config/historyInfo";
import bestStreaksByDifficulty from "../config/bestStreaksByDifficulty";
import toast, { Toaster } from "react-hot-toast";
import { FiAlertTriangle, FiAward } from "react-icons/fi";
import styles from "../styles/AppLayout.module.css";
import chalkboard from "../public/chalkboard.jpg";
import { focusOnAnswerTextBox } from "../core/gamePlayLogic";
import { Analytics } from "@vercel/analytics/react";
import { machinePartsClaimed } from "../config/machinePartsClaimed";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const defaultClaimedArray = [false, false, false, false, false, false, false];
  const defaultGemsArray = [
    [false, 1],
    [false, 2],
    [false, 3],
    [false, 4],
    [false, 5],
    [false, 7],
    [false, 10],
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("gemCount") === null) {
        // reset all localstorage if game already played before introduction of gems
        if (localStorage.getItem("returnUsage") != null) {
          localStorage.clear();
        }
        localStorage.setItem("gemCount", 0);
      }
      if (localStorage.getItem("dailyBonusGemDate") === null) {
        localStorage.setItem("dailyBonusGemDate", "1980-01-01");
      }
      if (localStorage.getItem("returnUsage") === null) {
        // date last used, current streak, all time best
        localStorage.setItem(
          "returnUsage",
          JSON.stringify(["1980-01-01", 0, 0])
        );
      }
      if (localStorage.getItem("isReturnUsageClaimed") === null) {
        const isReturnUsageClaimed = [
          [false, 2],
          [false, 4],
          [false, 6],
          [false, 8],
          [false, 10],
          [false, 14],
          [false, 20],
        ];
        localStorage.setItem(
          "isReturnUsageClaimed",
          JSON.stringify(isReturnUsageClaimed)
        );
      }
      if (localStorage.getItem("returnUsageGems") === null) {
        const returnUsageGems = defaultGemsArray;
        localStorage.setItem(
          "returnUsageGems",
          JSON.stringify(returnUsageGems)
        );
      }
      if (localStorage.getItem("achCorrectAnswers") === null) {
        localStorage.setItem("achCorrectAnswers", 0);
      }
      if (localStorage.getItem("isATCAClaimed") === null) {
        const isATCAClaimed = defaultClaimedArray;
        localStorage.setItem("isATCAClaimed", JSON.stringify(isATCAClaimed));
      }
      if (localStorage.getItem("atcaGems") === null) {
        const atcaGems = defaultGemsArray;
        localStorage.setItem("atcaGems", JSON.stringify(atcaGems));
      }
      if (localStorage.getItem("isStreakEasyClaimed") === null) {
        const isStreakEasyClaimed = defaultClaimedArray;
        localStorage.setItem(
          "isStreakEasyClaimed",
          JSON.stringify(isStreakEasyClaimed)
        );
      }
      if (localStorage.getItem("streakEasyGems") === null) {
        const streakEasyGems = defaultGemsArray;
        localStorage.setItem("streakEasyGems", JSON.stringify(streakEasyGems));
      }
      if (localStorage.getItem("isStreakMediumClaimed") === null) {
        const isStreakMediumClaimed = defaultClaimedArray;
        localStorage.setItem(
          "isStreakMediumClaimed",
          JSON.stringify(isStreakMediumClaimed)
        );
      }
      if (localStorage.getItem("streakMediumGems") === null) {
        const streakMediumGems = defaultGemsArray;
        localStorage.setItem(
          "streakMediumGems",
          JSON.stringify(streakMediumGems)
        );
      }
      if (localStorage.getItem("isStreakHardClaimed") === null) {
        const isStreakHardClaimed = defaultClaimedArray;
        localStorage.setItem(
          "isStreakHardClaimed",
          JSON.stringify(isStreakHardClaimed)
        );
      }
      if (localStorage.getItem("streakHardGems") === null) {
        const streakHardGems = defaultGemsArray;
        localStorage.setItem("streakHardGems", JSON.stringify(streakHardGems));
      }
      if (localStorage.getItem("hiddenAwardClicks") === null) {
        const hiddenAwardClicks = {
          unlockCost: 30,
          unlocked: false,
          found: false,
          challengeCompleted: false,
          awardClaimed: false,
          awardGems: 10,
          gemsClaimed: false,
        };
        localStorage.setItem(
          "hiddenAwardClicks",
          JSON.stringify(hiddenAwardClicks)
        );
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
      if (localStorage.getItem("isMachinePartClaimed") === null) {
        localStorage.setItem(
          "isMachinePartClaimed",
          JSON.stringify(machinePartsClaimed)
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
    }
    router.prefetch("/achievements");
    router.prefetch("/progress");
    router.prefetch("/machine");
  }, [
    typeof window !== "undefined" && localStorage.getItem("bestStreakReserve"),
  ]);

  const closeToast = () => {
    toast.dismiss();
    focusOnAnswerTextBox();
  };

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
      <div onClick={() => closeToast()}>
        <Toaster
          toastOptions={{
            style: {
              textAlign: "center",
              fontSize: "1.5rem",
            },
            error: {
              icon: <FiAlertTriangle color="red" size="50px" />,
            },
            success: {
              icon: <FiAward color="gold" size="190px" />,
              style: {
                background: "dimgrey",
                color: "white",
              },
              duration: 5000,
            },
          }}
        />
      </div>
    </>
  );
}
