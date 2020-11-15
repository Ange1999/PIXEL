import getSelectedToolFunction from "./toolbarFunctionality";
export default function (toolState) {
  // return - назад действие !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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


  function sizeCanvas() {
    oCanvas.height = parentCanvas.offsetHeight;
    oCanvas.width = parentCanvas.offsetWidth;
    figureDrowCanvas.height = parentCanvas.offsetHeight;
    figureDrowCanvas.width = parentCanvas.offsetWidth;
    dotDrowCanvas.height = parentCanvas.offsetHeight;
    dotDrowCanvas.width = parentCanvas.offsetWidth;
  }
  sizeCanvas();
  
  window.addEventListener("resize", sizeCanvas);

  function onMoveFigureDrowCanvas(oEvent,color){
    const selectedTool = toolState.getProp("selectedTool");
    const selectedToolFunction = getSelectedToolFunction(selectedTool);
    if (downLeftFlag || downRightFlag) {
      console.log(color)
      selectedToolFunction(
        oCanvasContext,
        figureDrowCanvas,
        figureDrowCanvasContext,
        clickCoordinateX,
        clickCoordinateY,
        moveCoordinateX,
        moveCoordinateY,
        toolState.getProp("selectedThickness"),
        color
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
      color
    );
  }

  dotDrowCanvas.addEventListener("contextmenu",(oEvent)=>{
    oEvent.preventDefault();
  })
  
  dotDrowCanvas.addEventListener("mousedown", (oEvent) => {
    if(oEvent.buttons == 1){
      downLeftFlag = true;
      const leftColor = toolState.getProp("selectedLeftColor")
      onClickFigureDrowCanvas(oEvent,leftColor);
      console.log(leftColor)
    } else if(oEvent.buttons == 2){
      downRightFlag = true;
      const rightColor = toolState.getProp("selectedRightColor")
      onClickFigureDrowCanvas(oEvent,rightColor);
      console.log(rightColor)
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
   
    const sizeDot = toolState.getProp("selectedThickness");
    getSelectedToolFunction("followSquare")(dotDrowCanvas, dotDrowCanvasContext, moveCoordinateX, moveCoordinateY, sizeDot);
     
  });

  dotDrowCanvas.addEventListener("mouseout", (oEvent) => {
    dotDrowCanvasContext.clearRect( 0, 0, dotDrowCanvas.width, dotDrowCanvas.height);
  });
}
