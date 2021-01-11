import toolChoiseState from './toolChoiseState';
import canvasState from "./canvasState"

const currentCanvasState = canvasState();

function lineUse(oCanvasContext, figureDrowCanvas,figureDrowCanvasContext, clickCoordinateX, clickCoordinateY, moveCoordinateX, moveCoordinateY, lineThickness, color){
  figureDrowCanvasContext.beginPath();
  figureDrowCanvasContext.moveTo(clickCoordinateX,clickCoordinateY)
  figureDrowCanvasContext.lineTo(moveCoordinateX,moveCoordinateY)
  figureDrowCanvasContext.clearRect(0, 0, figureDrowCanvas.width, figureDrowCanvas.height);
  figureDrowCanvasContext.lineWidth = lineThickness;
  figureDrowCanvasContext.strokeStyle = color;
  figureDrowCanvasContext.stroke();
}
function penUse(oCanvasContext, figureDrowCanvas,figureDrowCanvasContext, clickCoordinateX, clickCoordinateY, moveCoordinateX, moveCoordinateY, lineThickness, color,prevCoordinateX,prevCoordinateY)  {
  lineUse(figureDrowCanvas, oCanvasContext, figureDrowCanvasContext, prevCoordinateX, prevCoordinateY, moveCoordinateX, moveCoordinateY, lineThickness, color);  
  let radius = lineThickness/2;
  figureDrowCanvasContext.beginPath();
  figureDrowCanvasContext.arc(moveCoordinateX, moveCoordinateY, radius,  0, 2 * Math.PI);
  figureDrowCanvasContext.fillStyle = color;
  figureDrowCanvasContext.fill();
 
}

const toolbarFunctionality = {
  pen: penUse,
  eraser: function eraserUse(oCanvasContext,figureDrowCanvas,figureDrowCanvasContext,clickCoordinateX, clickCoordinateY, moveCoordinateX, moveCoordinateY, lineThickness, color) {
    oCanvasContext.clearRect(moveCoordinateX-lineThickness/2, moveCoordinateY-lineThickness/2, lineThickness, lineThickness);
  },
  line: lineUse,

  // clear: function clearCanvas(oCanvas) {
  //   const context = oCanvas.getContext("2d")
  //   context.clearRect(0, 0, oCanvas.width, oCanvas.height);
  // },
  imposition: function impositionOnMainCanvas(oCanvas,figureDrowCanvas){
    const oCanvasContext = oCanvas.getContext("2d");
    const oCanvasImgData = oCanvasContext.getImageData(0, 0, oCanvas.width, oCanvas.height);
    const dataCanvasImgData = oCanvasImgData.data;

    const figureDrowCanvasContext = figureDrowCanvas.getContext("2d");
    const figureDrowCanvasImgData = figureDrowCanvasContext.getImageData(0, 0, figureDrowCanvas.width, figureDrowCanvas.height);
    const dataFigureDrowCanvas = figureDrowCanvasImgData.data;

    const figureDataArr = dataFigureDrowCanvas.slice(0, dataFigureDrowCanvas.length)
    const mainDataArr = dataCanvasImgData.slice(0, dataCanvasImgData.length)

for(let i = 0; i < figureDataArr.length; i+=4){
  if( figureDataArr[i]!=0 || figureDataArr[i+1]!=0 || figureDataArr[i+2]!=0 || figureDataArr[i+3]!=0){
    //перенос в основной канвас
    mainDataArr[i] = figureDataArr[i];
    mainDataArr[i+1] = figureDataArr[i+1];
    mainDataArr[i+2] = figureDataArr[i+2];
    mainDataArr[i+3] = figureDataArr[i+3];
  }
}
//console.log(mainDataArr)
let imageData = new ImageData(mainDataArr, figureDrowCanvas.width, figureDrowCanvas.height);
oCanvasContext.putImageData(imageData,0,0)
figureDrowCanvasContext.clearRect(0, 0, figureDrowCanvas.width, figureDrowCanvas.height);
   
  },
  
  //2 точки передаются 4 координаты 

  rectangle: function rectangleUse(oCanvasContext,figureDrowCanvas,figureDrowCanvasContext, clickCoordinateX, clickCoordinateY,  moveCoordinateX, moveCoordinateY, lineThickness, color){
    const width = moveCoordinateX - clickCoordinateX;
    const height = moveCoordinateY - clickCoordinateY;
    figureDrowCanvasContext.beginPath();
    figureDrowCanvasContext.rect(clickCoordinateX, clickCoordinateY, width, height)
    figureDrowCanvasContext.clearRect(0, 0, figureDrowCanvas.width, figureDrowCanvas.height);
    figureDrowCanvasContext.lineWidth = lineThickness;
    figureDrowCanvasContext.strokeStyle = color;
    figureDrowCanvasContext.stroke();
  },
  triangle: function triangleUse(oCanvasContext,figureDrowCanvas,figureDrowCanvasContext, clickCoordinateX, clickCoordinateY,  moveCoordinateX, moveCoordinateY, lineThickness, color){
    figureDrowCanvasContext.beginPath();
    figureDrowCanvasContext.moveTo(clickCoordinateX, clickCoordinateY);
    figureDrowCanvasContext.lineTo(moveCoordinateX, moveCoordinateY);
    figureDrowCanvasContext.lineTo(moveCoordinateX-2*(moveCoordinateX-clickCoordinateX),moveCoordinateY);
    figureDrowCanvasContext.closePath();
    figureDrowCanvasContext.clearRect(0, 0, figureDrowCanvas.width, figureDrowCanvas.height);
    figureDrowCanvasContext.lineWidth = lineThickness;
    figureDrowCanvasContext.strokeStyle = color;
    figureDrowCanvasContext.stroke();
  },
  circle: function circleUse(oCanvasContext,figureDrowCanvas,figureDrowCanvasContext, clickCoordinateX, clickCoordinateY,  moveCoordinateX, moveCoordinateY, lineThickness, color) {
      let radius = Math.pow(
        Math.pow(moveCoordinateX - clickCoordinateX, 2) + Math.pow(moveCoordinateY - clickCoordinateY, 2),
        0.5
      );
      figureDrowCanvasContext.beginPath();
      figureDrowCanvasContext.arc(clickCoordinateX, clickCoordinateY, radius, 0, 2 * Math.PI);
      figureDrowCanvasContext.clearRect(0, 0, figureDrowCanvas.width, figureDrowCanvas.height);
      figureDrowCanvasContext.lineWidth = lineThickness;
      figureDrowCanvasContext.strokeStyle = color;
      figureDrowCanvasContext.stroke();
  },
  ellipse: function arrowRotateUse(oCanvasContext,figureDrowCanvas,figureDrowCanvasContext, clickCoordinateX, clickCoordinateY,  moveCoordinateX, moveCoordinateY, lineThickness, color){
    figureDrowCanvasContext.beginPath();
    figureDrowCanvasContext.ellipse(clickCoordinateX, clickCoordinateY,moveCoordinateX - clickCoordinateX, moveCoordinateY - clickCoordinateY,Math.PI / 4, 0, 2 * Math.PI)
    figureDrowCanvasContext.clearRect(0, 0, figureDrowCanvas.width, figureDrowCanvas.height);
    figureDrowCanvasContext.lineWidth = lineThickness;
    figureDrowCanvasContext.strokeStyle = color;
    figureDrowCanvasContext.stroke();
},

followSquare: function useFollowSquare(dotDrowCanvas, dotDrowCanvasContext, moveCoordinateX, moveCoordinateY, lineThickness){
  dotDrowCanvasContext.beginPath();
  dotDrowCanvasContext.rect(moveCoordinateX - lineThickness / 2, moveCoordinateY - lineThickness / 2, lineThickness, lineThickness);
  dotDrowCanvasContext.closePath();
  dotDrowCanvasContext.clearRect(0, 0, dotDrowCanvas.width, dotDrowCanvas.height);
  dotDrowCanvasContext.fillStyle = `rgba(107, 105, 105, 0.5)`;
  dotDrowCanvasContext.fill();
  dotDrowCanvasContext.stroke();
},
"mirror-pen": function mirrorPenUse(oCanvasContext, figureDrowCanvas,figureDrowCanvasContext, clickCoordinateX, clickCoordinateY, moveCoordinateX, moveCoordinateY, lineThickness, color,prevCoordinateX,prevCoordinateY){
  const oCanvas = document.getElementById("drawing-canvas");
 penUse(oCanvasContext, figureDrowCanvas,figureDrowCanvasContext, clickCoordinateX, clickCoordinateY, moveCoordinateX-lineThickness/2, moveCoordinateY-lineThickness/2, lineThickness, color,prevCoordinateX-lineThickness/2, prevCoordinateY-lineThickness/2)
 penUse(oCanvasContext, figureDrowCanvas,figureDrowCanvasContext, clickCoordinateX, clickCoordinateY, oCanvas.width - moveCoordinateX-lineThickness/2, moveCoordinateY-lineThickness/2, lineThickness, color,oCanvas.width -prevCoordinateX-lineThickness/2,  prevCoordinateY-lineThickness/2)
 },

 pipette: function pipetteUse(oCanvasContext,figureDrowCanvas,figureDrowCanvasContext,clickCoordinateX, clickCoordinateY, moveCoordinateX, moveCoordinateY, lineThickness, color){
  const oCanvas = document.getElementById("drawing-canvas");
  const pallete = document.getElementById("color");
  const imageData = oCanvasContext.getImageData(0,0,oCanvas.width, oCanvas.height)
  const pixelsArr = imageData.data;
  const redPixelInd = ((clickCoordinateY - 1) * (imageData.width * 4)) + ((clickCoordinateX - 1) * 4);
  let r = pixelsArr[redPixelInd].toString(16);
  let g = pixelsArr[redPixelInd+1].toString(16);
  let b = pixelsArr[redPixelInd+2].toString(16);
  if(r.length == 1){ r = "0" + r}
  if(g.length == 1){ g = "0" + g}
  if(b.length == 1){ b = "0" + b}
  const pixelColor = "#" + r + g + b;
  //const pixelcolor = `rgba(${pixelsArr[redPixelInd]},${pixelsArr[redPixelInd+1]}, ${pixelsArr[redPixelInd+2]}, ${pixelsArr[redPixelInd+3]})`;
  toolChoiseState().setProp("selectedLeftColor",pixelColor)
  pallete.value = pixelColor;
 },

 canvasFill: function canvasFillUse(oCanvasContext,figureDrowCanvas,figureDrowCanvasContext,clickCoordinateX, clickCoordinateY, moveCoordinateX, moveCoordinateY, lineThickness, color){
  const oCanvas = document.getElementById("drawing-canvas");
  const imageData = oCanvasContext.getImageData(0,0,oCanvas.width, oCanvas.height)
  const pixelsArr = imageData.data;
const  r = parseInt(color.slice(1, 3), 16)
const g = parseInt(color.slice(3, 5), 16)
const b = parseInt(color.slice(5, 7), 16) 
const a = 1;
  const pixelcolor = `rgba(${r},${g}, ${b},${a})`
  for (let i = 0; i < pixelsArr.length; i += 4) {
    if(pixelsArr[i] === 0){
      pixelsArr[i + 0] = r;
      pixelsArr[i + 1] = g;
      pixelsArr[i + 2] = b;
      pixelsArr[i + 3] = a*255;
    }
  }
  console.log(pixelsArr)
  oCanvasContext.putImageData(imageData, 0, 0);
  
 },
 lighter: function lighterUse(oCanvasContext,figureDrowCanvas,figureDrowCanvasContext,clickCoordinateX, clickCoordinateY, moveCoordinateX, moveCoordinateY, lineThickness, color){
  //penUse(oCanvasContext, figureDrowCanvas,figureDrowCanvasContext, clickCoordinateX, clickCoordinateY, moveCoordinateX, moveCoordinateY, lineThickness, color,prevCoordinateX,prevCoordinateY) 
  // figureDrowCanvas.globalAlpha = 0.2;
  // for(let i = 1; i>= 0; i= i-0.1){
  //   console.log(i)
  // }
  // oCanvasContext.fillStyle=color; 
  // const oCanvas = document.getElementById("drawing-canvas");
  // const imageData = oCanvasContext.getImageData(0,0,oCanvas.width, oCanvas.height)
  // const pixelsArr = imageData.data;
  // const redPixelInd = ((clickCoordinateY - 1) * (imageData.width * 4)) + ((clickCoordinateX - 1) * 4);
  // const pixelcolor = `rgba(${pixelsArr[redPixelInd]},${pixelsArr[redPixelInd+1]}, ${pixelsArr[redPixelInd+2]}, ${pixelsArr[redPixelInd+3]-50})`;
  // console.log(pixelcolor)
 }

};
export default function getSelectedToolFunction(selectedTool) {
  return toolbarFunctionality[selectedTool];

}
