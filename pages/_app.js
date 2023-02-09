import Head from "next/head";
import Image from "next/image";
import "../styles/globals.css";
import ErrorBoundary from "../components/error-boundary";
import { Toaster } from "react-hot-toast";
import { AlertTriangle } from "react-feather";
import styles from "../styles/AppLayout.module.css";
import chalkboard from "../public/chalkboard.jpg";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>NumberCruncher</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin+Sketch&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className={styles.main}>
        <ErrorBoundary>
          <Component {...pageProps} />
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
            fontSize: "0.9rem",
          },
          error: {
            icon: <AlertTriangle color="red" size="30px" />,
          },
        }}
      />
    </>
  );
}
