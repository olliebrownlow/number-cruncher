import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import PageHeading from "../components/pageHeading";
import Spacer from "../components/spacer";
import styles from "../styles/About.module.css";
import colours from "../config/colours";

const About = () => {
  return (
    <>
      <BackButton />
      <HomeButton />
      <PageHeading heading={"About"} />
      <div className={styles.about}>
      <h3
          style={{
            color: colours[Math.floor(Math.random() * colours.length)],
          }}
        >
          Quick dedication
        </h3>
        <Spacer />
        <p>
          For my beautiful daughters, Gabriela and Clarice.
        </p>
        <Spacer />
        <h3
          style={{
            color: colours[Math.floor(Math.random() * colours.length)],
          }}
        >
          What..
        </h3>
        <Spacer />
        <p>
          A series of times tables games developed using NextJs, a React
          framework, and deployed on Vercel.
        </p>
        <Spacer />
        <h3
          style={{
            color: colours[Math.floor(Math.random() * colours.length)],
          }}
        >
          Who..
        </h3>
        <Spacer />
        <p>
          This is for all kids (and adults!) anywhere who struggle with, need
          practice or just love working through their times tables.
        </p>
        <Spacer />
        <p>
          It has been developed mainly on a smart phone by a lone programmer and
          parent, in their spare time and with no technical help beyond Google
          and the documentation available for the tech stack in use.
        </p>
        <Spacer />
        <p>
          Suggestions on game play, and other ideas, offered by the developer's
          offspring have been gratefully received and very often incorporated,
          but clearly, the greatest need here is to make the game look better.
          If you have the skills on this front and would be interested in
          getting involved, or if you'd just like to leave any positive feedback
          or constructive suggestions, the email address to contact is
          o.s.brownlow@gmail.com.
        </p>
        <Spacer />
        <h3
          style={{
            color: colours[Math.floor(Math.random() * colours.length)],
          }}
        >
          Why..
        </h3>
        <Spacer />
        <div className={styles.list}>
          <ul>
            <li>Free</li>
            <li>No adverts</li>
            <li>No sign in</li>
            <li>No personal data collected</li>
          </ul>
        </div>
        <Spacer />
        <p>
          Most individual game play progress and settings (e.g., the times
          tables you have selected to play with, the current question you are
          on, the number of questions you have got right or wrong, etc.) is
          stored temporarily in the browser tab. This is so that page refreshes
          in the middle of play don't reset the state of the game. Progress can
          be wiped if a new tab is used, but equally there is a restart button.
        </p>
        <Spacer />
        <p>
          Overall game progress (e.g., your achievements, score and any other
          ongoing info you build up over playing multiple individual games) is
          stored in the browser. To wipe this info, you would need to either
          delete all browser data, or browser data for just this site in
          particular, normally achievable through the browser settings options.
        </p>
        <Spacer />
        <p>
          A cosequence of the "no sign in" decision is that if more than one
          person on any particular device wishes to play the games and keep
          their progress and scores individually, this would only be possible if
          the players used separate browsers, e.g., one could use chrome while
          another uses firefox and a third uses edge or safari etc.
        </p>
        <Spacer />
      </div>
    </>
  );
};

export default About;
