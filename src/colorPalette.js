export default function changeColor(toolState) {
  const pallete = document.getElementById("color");
  pallete.addEventListener("change", () => {
    toolState.setProp("selectedLeftColor", pallete.value);
  });
}
