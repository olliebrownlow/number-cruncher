import {
  GiRobe,
  GiQueenCrown,
  GiThroneKing,
  GiOverlordHelm,
} from "react-icons/gi";

export const getMasteryIconAndTitle = (index) => {
  switch (index) {
    case 1:
      return (
        <>
          <GiRobe size={120} />
          <div style={{ fontWeight: "700", paddingBottom: "8px" }}>
            Emerging leader
          </div>
        </>
      );
    case 2:
      return (
        <>
          <GiQueenCrown size={120} />
          <div style={{ fontWeight: "700", paddingBottom: "8px" }}>
            Bombastic caesar
          </div>
        </>
      );
    case 3:
      return (
        <>
          <GiThroneKing size={120} />
          <div style={{ fontWeight: "700", paddingBottom: "8px" }}>
            Rising overlord
          </div>
        </>
      );
    case 4:
      return (
        <>
          <GiOverlordHelm size={120} />
          <div style={{ fontWeight: "700", paddingBottom: "8px" }}>
            Evil genius grand master
          </div>
        </>
      );
    default:
      return (
        <>
          <GiRobe size={120} />
          <div style={{ fontWeight: "700", paddingBottom: "8px" }}>
            Emerging leader
          </div>
        </>
      );
  }
};
