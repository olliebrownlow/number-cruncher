import Spacer from "./spacer";
import { Tool } from "react-feather";

const UnderConstruction = () => {
  return (
    <>
      <Spacer />
      <div style={{ fontSize: "1.5rem" }}>
        <Tool fill={"white"} /> UNDER CONSTRUCTION <Tool fill={"white"} />
      </div>
      <Spacer />
      <div style={{ fontSize: "1.5rem" }}>--</div>
      <Spacer />
      <div style={{ fontSize: "1.5rem" }}> check back soon..</div>
    </>
  );
};

export default UnderConstruction;
