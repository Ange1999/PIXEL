import canvasState from "./canvasState"

export default function () {
  const oCanvas = document.getElementById("drawing-canvas");
  const frame = document.getElementById("animatedFrame");
  const listFrames = document.querySelectorAll(".wrapper-frame");
  const listOfBackground = document.getElementById("choiceBackground");
  const currentCanvasState = canvasState();
  listOfBackground.addEventListener("click", (oEvent) => {
    if (oEvent.target.id === "choiceBackground") {
      ("");
    } else {
      currentCanvasState.setCurrentBackgroundCanvas(`../dist/img/${oEvent.target.id}.png`);
      const url =  currentCanvasState.getCurrentBackgroundCanvas();
      const strUrl = `url(${url})`;
      oCanvas.style.backgroundImage =  strUrl;
      frame.style.backgroundImage = strUrl;
      listFrames.forEach((frameA) => {
        frameA.style.backgroundImage = strUrl;
      });
    }
  });
}
