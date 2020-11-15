export default function selectLineThickness(toolState) {
  const slider = document.getElementById("thickness-slider");
  slider.addEventListener("change", function (oEvent) {
    toolState.setProp("selectedThickness", slider.value);
  });
}
