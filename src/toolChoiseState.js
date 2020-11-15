export default function currentTool() {
  const toolState = {
    selectedTool: "pen",
    selectedThickness: 10,
    selectedLeftColor: "",
    selectedRightColor: "",
  };
  function getProp(prop) {
    return toolState[prop];
  }
  function setProp(prop, value) {
    toolState[prop] = value;
    console.log(prop, value)
  }
  return {
    getProp: getProp,
    setProp: setProp,
  };
}
