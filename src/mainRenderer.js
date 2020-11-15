let oBody = document.getElementById("body");

function renderer(toolState) {
  oBody.insertAdjacentHTML(
    "afterbegin",
    `<header id = "header-wrap">
    <h1>PIXEL</h1>
        </header>
    <main>
    <section id='left-sticky-section'>
  
  <div id='toolbar'>
<div><img title = "Pen tool" class = 'instruments'  id='pen' src='./img/pen.png'></div>
<div><img title = "Eraser tool" class = 'instruments' id='eraser' src='./img/eraser.png'></div>
<div><img title = "Stroke tool" class = 'instruments' id='line'src='./img/line.png'></div>
<div><img title = "Rectangle tool" class = 'instruments' id='rectangle' src='./img/rectangle.png'></div>
<div><img title = "Triangle tool" class = 'instruments'  id='triangle' src='./img/triangle.png'></div>
<div><img title = "Circle tool" class = 'instruments' id='circle' src='./img/circle.png'></div>
<div><img title = "Vertical Mirror pen" class = 'instruments' id='mirror-pen' src='./img/mirror-pen.png'></div>
<div><img class = 'instruments' id='arrow' src='./img/arrow.png'></div>
<div id="color-panel">
<input type="color" title = "Left mouse color button" id="color">
<input type="color" title = "Right mouse color button" id="right-color">
</div>
<div id = "slider-container">
<input type="range" min="1" max="25" value = ${toolState.getProp("selectedThickness")} id="thickness-slider">
</div>
</div>

<div id="preview-list-wrapper">
<ul class="preview-list"></ul>
<button>Add new frame</button>
</div>
</section>
<section id='drawing-canvas-container'>
<div id="parent-canvas">
<input type="hidden" id="inputText">
<canvas id="drawing-canvas"></canvas>
<canvas id="cabbage-skin-canvas"></canvas>
<canvas id="dot-overlay-canvas"></canvas>
</div>
</section>
<section id='right-sticky-section'>
<div id="commonButtonContainer">
<input type="file"name="add-img" id="add-img" multiple>
<label for="add-img">Choose a file</label>
<button id="butt-delete-img">Delete picture</button>
<button id="butt-save-img">Save picture</button>
</div>
</section></main>`
  );
}

export default renderer;
