import canvasState from "./canvasState";

const currentCanvasState = canvasState();

export default function(url){
    const frame = document.getElementById("animatedFrame");
    const oCanvas = document.getElementById("drawing-canvas");
    const listAddedFrames = document.querySelectorAll(".wrapper-frame");
    const strUrl = `url(${url})`;
    currentCanvasState.setCurrentBackgroundCanvas(url)
    oCanvas.style.backgroundImage =  strUrl;
    frame.style.backgroundImage = strUrl;
    listAddedFrames.forEach((frameA) => {
      frameA.style.backgroundImage = strUrl;
    });
}