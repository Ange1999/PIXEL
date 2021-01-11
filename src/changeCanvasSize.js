import sizeCanvas from "./canvasSize";
export default function () {
    const oCanvas = document.getElementById("drawing-canvas");
    const oCanvasContext = oCanvas.getContext("2d");
  const parentCanvas = document.getElementById("parent-canvas");
  const oWidthInput = document.getElementById("changeSizeWidth");
  const oHeightInput = document.getElementById("changeSizeHeight");
 
  oHeightInput.addEventListener("change", (oEvent) => {
    
    oCanvasContext.scale(1.3, 1.3)
//     const canvasScale = oHeightInput.value/parentCanvas.offsetHeight;
//     sizeCanvas(Math.floor(parentCanvas.offsetHeight * canvasScale), Math.floor(parentCanvas.offsetHeight * canvasScale));
   });
}
