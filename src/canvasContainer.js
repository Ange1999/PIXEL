import getSelectedToolFunction from './toolbarFunctionality'
import sizeCanvas from './canvasSize'


export default function (toolState) {
  // return - назад действие !!!!!
  const blokContainingCanvases = document.getElementById("drawing-canvas-container")
  const parentCanvas = document.getElementById("parent-canvas");
  const oCanvas = document.getElementById("drawing-canvas");
  const figureDrowCanvas = document.getElementById("cabbage-skin-canvas");
  const dotDrowCanvas = document.getElementById("dot-overlay-canvas");
  const oCanvasContext = oCanvas.getContext("2d");
  const dotDrowCanvasContext = dotDrowCanvas.getContext("2d");
  const figureDrowCanvasContext = figureDrowCanvas.getContext("2d");

  let downLeftFlag = false;
  let downRightFlag = false;
  let clickCoordinateY = 0;
  let clickCoordinateX = 0;
  let moveCoordinateY = 0;
  let moveCoordinateX = 0;
  let prevCoordinateY = 0;
  let prevCoordinateX = 0;

 sizeCanvas(parentCanvas.offsetHeight,parentCanvas.offsetWidth);
 
 // window.addEventListener("resize", sizeCanvas(parentCanvas.offsetHeight,parentCanvas.offsetWidth));

  function onMoveFigureDrowCanvas(oEvent,color){
    const selectedTool = toolState.getProp("selectedTool");
    const selectedToolFunction = getSelectedToolFunction(selectedTool);
    if (downLeftFlag || downRightFlag) {
      selectedToolFunction(
        oCanvasContext,
        figureDrowCanvas,
        figureDrowCanvasContext,
        clickCoordinateX,
        clickCoordinateY,
        moveCoordinateX,
        moveCoordinateY,
        toolState.getProp("selectedThickness"),
        color, 
        prevCoordinateX,
        prevCoordinateY
      );
  }
  }
  
  function onClickFigureDrowCanvas(oEvent,color) {
    clickCoordinateY = oEvent.offsetY;
    clickCoordinateX = oEvent.offsetX;
    const selectedTool = toolState.getProp("selectedTool");
    const selectedToolFunction = getSelectedToolFunction(selectedTool);
    selectedToolFunction(
      oCanvasContext,
      figureDrowCanvas,
      figureDrowCanvasContext,
      clickCoordinateX,
      clickCoordinateY,
      moveCoordinateX,
      moveCoordinateY,
      toolState.getProp("selectedThickness"),
      color,
      prevCoordinateX,
      prevCoordinateY
    );
  }

  blokContainingCanvases.addEventListener("contextmenu",(oEvent)=>{
    oEvent.preventDefault();
  })
  
  dotDrowCanvas.addEventListener("mousedown", (oEvent) => {
    if(oEvent.buttons === 1){
      downLeftFlag = true;
      const leftColor = toolState.getProp("selectedLeftColor")
      onClickFigureDrowCanvas(oEvent,leftColor);
    } else if(oEvent.buttons === 2){
      downRightFlag = true;
      const rightColor = toolState.getProp("selectedRightColor")
      onClickFigureDrowCanvas(oEvent,rightColor);
    }
  });

  dotDrowCanvas.addEventListener("mouseup", (oEvent) => {
    if(oEvent.button === 0){

      downLeftFlag = false;
    } else if (oEvent.button === 2){
      downRightFlag = false;
    }
    getSelectedToolFunction("imposition")(oCanvas,figureDrowCanvas);
  });

  dotDrowCanvas.addEventListener("mousemove", (oEvent) => {
    moveCoordinateY=oEvent.offsetY;
    moveCoordinateX=oEvent.offsetX;

    if(downRightFlag){
      const rightColor = toolState.getProp("selectedRightColor")
      onMoveFigureDrowCanvas(oEvent,rightColor);
    }
    else if (downLeftFlag){
      const leftColor = toolState.getProp("selectedLeftColor")
      onMoveFigureDrowCanvas(oEvent,leftColor);
    }
    prevCoordinateY = moveCoordinateY;
    prevCoordinateX = moveCoordinateX;
   
    const sizeDot = toolState.getProp("selectedThickness");
    getSelectedToolFunction("followSquare")(dotDrowCanvas, dotDrowCanvasContext, moveCoordinateX, moveCoordinateY, sizeDot);
     
  });

  dotDrowCanvas.addEventListener("mouseout", (oEvent) => {
    dotDrowCanvasContext.clearRect( 0, 0, dotDrowCanvas.width, dotDrowCanvas.height);
      downLeftFlag = false;
      downRightFlag = false;
    
 
  });
}
