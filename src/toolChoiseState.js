const toolState = {
  selectedTool: "pen",
  selectedThickness: 10,
  selectedLeftColor: "#000000",
  selectedRightColor: "#000000",
};
export default function currentTool() {
  function getProp(prop) {
    return toolState[prop];
  }
  function setProp(prop, value) {
    toolState[prop] = value;
  }
  return {
    getProp: getProp,
    setProp: setProp,
  };
}
