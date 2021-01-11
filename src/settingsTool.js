import dataFrames from './mainDataModel'
import canvasState from './canvasState'
import changeGridBackground from './changeBackground'
const currentCanvasState = canvasState();

export default function(toolState){     
    // можно добавить настройки и там выбор темы(светлая / темная)
    //  кнопка удалить все сюда подходит?
const inputAdd = document.getElementById("add-img");
const oCanvas = document.getElementById("drawing-canvas");
const oCanvasContext = oCanvas.getContext("2d");

const arrayImg = JSON.parse(localStorage.getItem("imgCanvas")) || [];
  dataFrames.pushFrames(arrayImg);

changeGridBackground(localStorage.getItem("theme") || currentCanvasState.getCurrentBackgroundCanvas());


window.onbeforeunload = function(){
  localStorage.setItem("imgCanvas", JSON.stringify(dataFrames.getFrames()));
  localStorage.setItem("theme", currentCanvasState.getCurrentBackgroundCanvas());
}

window.onload = function(){ // при загрузке выделен первый фрейм и отображен на канвасе
  const firstFrame = dataFrames.getFrames()[0];
  const firstSelectedTool = document.getElementById(`${toolState.getProp("selectedTool")}`)
  const arrImages = document.querySelectorAll(".img-frame")
  currentCanvasState.setCurrentSrcCanvas(firstFrame)
  currentCanvasState.setIdCurrentFrame(0)
  arrImages[0].classList.add("selectedButton");
  const firstSelectedImg = new Image();
  firstSelectedImg.src = firstFrame;
  oCanvasContext.drawImage(firstSelectedImg, 0, 0, oCanvas.width, oCanvas.height);
  firstSelectedTool.classList.add("selectedButton");  
}


inputAdd.addEventListener("change", () => {  //Загрузка картинки
    const reader = new FileReader();
    reader.onload = function () {
      const img = new Image();
      img.onload = function () {
        oCanvas.height = img.height;
        oCanvas.width = img.width;
        oCanvasContext.drawImage(img, 0, 0, oCanvas.width, oCanvas.height);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(inputAdd.files[0]);
  });

  const oSaveButton = document.getElementById("butt-save-img"); //Сохранение картинки
  //const urlCanvas = oCanvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
 
  oSaveButton.addEventListener("click", ()=>{
   oCanvas.toBlob(function(blob){
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.download = "image.png";
    link.click();
    document.body.removeChild(link); 
   },'image/png');
  })

  let oButtonDel = document.getElementById("butt-delete-img");  //Удаление картинки
  oButtonDel.addEventListener("click", () => {
    oCanvasContext.clearRect(0, 0, oCanvas.width, oCanvas.height);
  });
}

