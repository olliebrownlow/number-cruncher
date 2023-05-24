import BackButton from "../components/backButton";
import HomeButton from "../components/homeButton";
import PageHeading from "../components/pageHeading";
import ReleaseTable from "../components/releaseTable";
import Spacer from "../components/spacer";
import styles from "../styles/About.module.css";
import colours from "../config/colours";
import { FaLaptopCode } from "react-icons/fa";
import { RxVercelLogo } from "react-icons/rx";
import { MdPhoneIphone } from "react-icons/md";
import { RiGitMergeLine } from "react-icons/ri";

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
          For my beautiful daughters, Gabriela and Clarice, and neices, Seren,
          Nina and Faerydae.
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
          framework, and deployed on Vercel. Players collect gems to unlock more
          games and challenges. The ultimate goal is to master all the times
          tables, build the Number Cruncher machine and feed the tables in.
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
          I have developed this mainly on a smart phone, in my spare time and
          with no technical help beyond Google and the documentation available
          for the tech stack in use.{" "}
          <b style={{ fontSize: "1.5rem", color: "yellow" }}>
            Note that it looks and works best on your phone.
          </b>{" "}
          Page element sizes and styling may not look quite right on tablets,
          pcs and other larger devices, although I will try to fix these
          differences as and when I can.
        </p>
        <Spacer />
        <p>
          Suggestions on game play, and other ideas, offered by my children and
          neices have been gratefully received and very often incorporated, but
          clearly, the greatest need here is to make the game look better. If
          you have the skills on this front and would be interested in getting
          involved, or if you'd just like to leave any positive feedback or
          constructive suggestions, the email address to contact is{" "}
          <b style={{ fontSize: "1.35rem", color: "yellow" }}>
            numbercruncher2023@gmail.com
          </b>
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
          Again, there are often reset buttons on the screens.
        </p>
        <Spacer />
        <p>
          Finally, a consequence of the "no sign in" decision is that if more
          than one person on a particular device wishes to play the games and
          keep their progress and scores individually, this would only be
          possible if the players used separate browsers, e.g., one could use
          chrome while another uses firefox and a third uses edge or safari etc.
        </p>
        <Spacer />
        <h3
          style={{
            color: colours[Math.floor(Math.random() * colours.length)],
          }}
        >
          Release history
        </h3>
        <Spacer size={"0.25rem"} />
        <div className={styles.releaseIcons}>
          <FaLaptopCode size={32} color={colours[8]} /> -&gt;
          <RiGitMergeLine size={32} color={colours[7]} /> -&gt;
          <RxVercelLogo size={32} color={colours[5]} /> -&gt;
          <MdPhoneIphone size={32} color={colours[10]} />
        </div>
        <Spacer />
        <ReleaseTable />
        <Spacer />
      </div>
    </>
  );
};

export default About;
