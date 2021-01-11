export default function sizeCanvas(height, width){
    const oCanvas = document.getElementById("drawing-canvas");
    const figureDrowCanvas = document.getElementById("cabbage-skin-canvas");
    const dotDrowCanvas = document.getElementById("dot-overlay-canvas");
    oCanvas.height = height;
    oCanvas.width = width;
    figureDrowCanvas.height = height;
    figureDrowCanvas.width = width;
    dotDrowCanvas.height = height;
    dotDrowCanvas.width = width;
}


