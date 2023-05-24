export const handleMachinePartClaim = (index) => {
  // mark machine part as claumed
  const isMachinePartClaimed = JSON.parse(
    localStorage.getItem("isMachinePartClaimed")
  );
  isMachinePartClaimed[index] = true;
  localStorage.setItem(
    "isMachinePartClaimed",
    JSON.stringify(isMachinePartClaimed)
  );
};
