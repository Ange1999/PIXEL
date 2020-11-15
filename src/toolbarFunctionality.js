const toolbarFunctionality = {
  pen: function penUse(oCanvasContext, figureDrowCanvas,figureDrowCanvasContext, clickCoordinateX, clickCoordinateY, moveCoordinateX, moveCoordinateY, lineThickness, color)  {
    figureDrowCanvasContext.fillStyle = color;
    figureDrowCanvasContext.fillRect(moveCoordinateX-lineThickness/2, moveCoordinateY-lineThickness/2, lineThickness, lineThickness);
    
    figureDrowCanvasContext.stroke();
  
  },
  eraser: function eraserUse(oCanvasContext,figureDrowCanvas,figureDrowCanvasContext,clickCoordinateX, clickCoordinateY, moveCoordinateX, moveCoordinateY, lineThickness, color) {
    oCanvasContext.clearRect(moveCoordinateX-lineThickness/2, moveCoordinateY-lineThickness/2, lineThickness, lineThickness);
  },
  line: function lineUse(oCanvasContext, figureDrowCanvas,figureDrowCanvasContext, clickCoordinateX, clickCoordinateY, moveCoordinateX, moveCoordinateY, lineThickness, color){
    figureDrowCanvasContext.beginPath();
    figureDrowCanvasContext.moveTo(clickCoordinateX,clickCoordinateY)
    figureDrowCanvasContext.lineTo(moveCoordinateX,moveCoordinateY)
    figureDrowCanvasContext.clearRect(0, 0, figureDrowCanvas.width, figureDrowCanvas.height);
    figureDrowCanvasContext.lineWidth = lineThickness;
    figureDrowCanvasContext.strokeStyle = color;
    figureDrowCanvasContext.stroke();
  },

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
    let width = moveCoordinateX - clickCoordinateX;
    let height = moveCoordinateY - clickCoordinateY;
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
arrow: function arrowRotateUse(oCanvasContext,figureDrowCanvas,figureDrowCanvasContext, clickCoordinateX, clickCoordinateY,  moveCoordinateX, moveCoordinateY, lineThickness, color){
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
["mirror-pen"]: function mirrorPenUse(oCanvasContext, figureDrowCanvas,figureDrowCanvasContext, clickCoordinateX, clickCoordinateY, moveCoordinateX, moveCoordinateY, lineThickness, color){
  figureDrowCanvasContext.fillStyle = color;
  const oCanvas = document.getElementById("drawing-canvas");//?? can i do in this way
  figureDrowCanvasContext.fillRect(moveCoordinateX-lineThickness/2, moveCoordinateY-lineThickness/2, lineThickness, lineThickness)
  figureDrowCanvasContext.fillRect(oCanvas.width - moveCoordinateX-lineThickness/2, moveCoordinateY-lineThickness/2, lineThickness, lineThickness)
 }

};
export default function getSelectedToolFunction(selectedTool) {
  return toolbarFunctionality[selectedTool];

}
