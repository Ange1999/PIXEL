export default function changeColor(toolState) {
  const pallete = document.getElementById("color");
  const palleteRight = document.getElementById("right-color");
  const colorPanel = document.getElementById("color-panel");
  const newColor = localStorage.getItem("leftColor") || pallete.value;
  pallete.value = newColor;
  const newRightColor = localStorage.getItem("rightColor") || palleteRight.value;
  palleteRight.value = newRightColor;
  toolState.setProp("selectedRightColor", newRightColor);
  toolState.setProp("selectedLeftColor", newColor);
    createListener(toolState, pallete, "selectedLeftColor", "leftColor");
    createListener(toolState, palleteRight, "selectedRightColor", "rightColor");
}

function createListener(toolState, selectedColorInput, prop, key) { // функция вешает обработчик на input, обработчик будет работать после того, как функция отработает
  selectedColorInput.addEventListener("change", () => {
    const valueSColor = selectedColorInput.value;
    toolState.setProp(prop, valueSColor);
    localStorage.setItem(key, valueSColor);
  });
}



