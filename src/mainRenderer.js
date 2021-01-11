let oBody = document.getElementById("body");

function renderer(toolState,framesData) {
  oBody.insertAdjacentHTML(
    "afterbegin",
    `<header id = "header-wrap">
    <h1><a href="#">picturess</a></h1>
        </header>
    <main>
    <section id='left-sticky-section'>
  <div id='wrapper-toolbar'>
  <div id='toolbar'>
  <div id='mainInstruments'>
    <div><img title = "Pen tool" class = 'instruments'  id='pen' src='../dist/img/pen.png'></div>
    <div><img title = "Eraser tool" class = 'instruments' id='eraser' src='../dist/img/eraser.png'></div>
    <div><img title = "Stroke tool" class = 'instruments' id='line'src='../dist/img/line.png'></div>
    <div><img title = "Vertical Mirror pen" class = 'instruments' id='mirror-pen' src='../dist/img/mirror-pen.png'></div>
    <div><img title = "Paint All pixels of the same color" class = 'instruments' id='canvasFill' src='../dist/img/canvasFill.png'></div>
    <div><img title = "Color picker" class = 'instruments' id='pipette' src='../dist/img/pipette.png'></div>
  </div>
  <div id='figures'>
    <div><img title = "Rectangle tool" class = 'instruments' id='rectangle' src='../dist/img/rectangle.png'></div>
    <div><img title = "Triangle tool" class = 'instruments'  id='triangle' src='../dist/img/triangle.png'></div>
    <div><img title = "Circle tool" class = 'instruments' id='circle' src='../dist/img/circle.png'></div>
    <div><img title = "Ellipse tool" class = 'instruments' id='ellipse' src='../dist/img/ellipse.png'></div>
    <div><img class = 'instruments' id='rotate' src='../dist/img/arrow.png'></div>
    <div><img class = 'instruments' id='flip' src='../dist/img/flip.png'></div>
  </div>
</div>
<div id = "slider-container">
<input type="range" min="1" max="25" value = ${toolState.getProp("selectedThickness")} id="thickness-slider">
</div>
<div id="color-panel">
<input type="color" title = "Left mouse color button" id="color">
<input type="color" title = "Right mouse color button" id="right-color">
</div>
</div>

<div id="preview-list-wrapper">
<ul id = "list-frames"></ul>
<button id="addFrameButton">Add new frame</button>
</div>
</section>
<section id='drawing-canvas-container'>
<div id="parent-canvas">
<canvas id="drawing-canvas"></canvas>
<canvas id="cabbage-skin-canvas"></canvas>
<canvas id="dot-overlay-canvas"></canvas>
</div>
</section>
<section id='right-sticky-section'>
<div id="commonButtonContainer">
<div id=fps-picture>
<img src = ${framesData.getFrames()[1]} id="animatedFrame">
</div>
<div id="display-fps-container">
<span id="display-fps">${framesData.getCurrentFps()} FPS</span>
<input type="range" min="1" max="60" value = ${framesData.getCurrentFps()} id="fps-slider">
</div>


<input type="file"name="add-img" id="add-img" multiple>  
<label for="add-img">Choose a file</label>
<button id="butt-delete-img">Delete picture</button>
<button id="butt-save-img">Save picture .png</button>
<!--  <button id="butt-save-gif">Save animation .gif</button> -->
</div>
<div id="container-resize-settings">
<!-- <span>RESIZE</span>
<div id="resize-inputs">
<input type="text" placeholder="Height" id="changeSizeHeight"> <span>×</span> <input type="text"placeholder="Width" id="changeSizeWidth">
</div>-->
<div id="background">Background:</div>
<div id="choiceBackground">
<img сlass="typeBackground" src="../dist/img/grid.png" id="grid">
<img сlass="typeBackground" src="../dist/img/grid2.png" id="grid2">
<img сlass="typeBackground" src="../dist/img/grid3.png" id="grid3">
<img сlass="typeBackground" src="../dist/img/grid4.png" id="grid4">
</div>
</div>


</section></main>`
  );
}

export default renderer;
