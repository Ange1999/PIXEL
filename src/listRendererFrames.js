import dataFrames from "./mainDataModel";
import Sortable from "sortablejs";
import canvasState from "./canvasState";
import changeGridBackground from "./changeBackground";

const currentCanvasState = canvasState();

export default function () {
  const oCanvas = document.getElementById("drawing-canvas");
  const addFrame = document.getElementById("addFrameButton");
  const dotDrowCanvas = document.getElementById("dot-overlay-canvas");
  const oCanvasContext = oCanvas.getContext("2d");
  const listFrames = document.getElementById("list-frames");
  const updateCurrentFrames = dataFrames.getFrames(); // массив frames

  const listOfBackground = document.getElementById("choiceBackground");

  listOfBackground.addEventListener("click", (oEvent) => {
    if (oEvent.target.id === "choiceBackground") {
  
    } else {
      currentCanvasState.setCurrentBackgroundCanvas(
        `../dist/img/${oEvent.target.id}.png`
      );
      const url = currentCanvasState.getCurrentBackgroundCanvas();
      redrowListFrames(updateCurrentFrames, listFrames);
      changeGridBackground(url);
    }
  });

  const rotateButton = document.getElementById("rotate");
  const flipButton = document.getElementById("flip");

  rotateButton.addEventListener("click", (oEvent) => {
    ///rotate Canvas
    oCanvasContext.clearRect(0, 0, oCanvas.width, oCanvas.height);
    const rotateImg = new Image();
    rotateImg.src = currentCanvasState.getCurrentSrcCanvas();
    const idCurrentRotateImg = currentCanvasState.getIdCurrentFrame();
    oCanvasContext.save();
    oCanvasContext.translate(oCanvas.width / 2, oCanvas.height / 2);
    oCanvasContext.rotate((90 * Math.PI) / 180);
    oCanvasContext.drawImage(
      rotateImg,
      -oCanvas.width / 2,
      -oCanvas.height / 2
    );
    oCanvasContext.translate(-oCanvas.width / 2, -oCanvas.height / 2);
    oCanvasContext.restore();
    const rotateCanvasSrc = oCanvas.toDataURL();
    dataFrames.updateFrame(idCurrentRotateImg, rotateCanvasSrc);
    currentCanvasState.setCurrentSrcCanvas(rotateCanvasSrc);
    redrowListFrames(updateCurrentFrames, listFrames);
  });

  flipButton.addEventListener("click", (oEvent) => {
    oCanvasContext.clearRect(0, 0, oCanvas.width, oCanvas.height);
    const mirrorImg = new Image();
    mirrorImg.src = currentCanvasState.getCurrentSrcCanvas();
    const idCurrentMirrorImg = currentCanvasState.getIdCurrentFrame();
    oCanvasContext.save();
    oCanvasContext.scale(-1, 1);
    oCanvasContext.drawImage(
      mirrorImg,
      0,
      0,
      mirrorImg.width * -1,
      mirrorImg.height
    );
    oCanvasContext.restore();
    const mirrorCanvasSrc = oCanvas.toDataURL();
    dataFrames.updateFrame(idCurrentMirrorImg, mirrorCanvasSrc);
    currentCanvasState.setCurrentSrcCanvas(mirrorCanvasSrc);
    redrowListFrames(updateCurrentFrames, listFrames);
  });

  const cleanCloneCanvas = document.createElement("canvas");

  function defaultSelectedFrame() {
    if (dataFrames.getFrames().length === 0) {
      const currentCanvas = oCanvas.toDataURL();
      dataFrames.pushFrame(currentCanvas);
      currentCanvasState.setCurrentSrcCanvas(currentCanvas);
      currentCanvasState.setIdCurrentFrame(0);
    }
    redrowListFrames(updateCurrentFrames, listFrames);
  }

  defaultSelectedFrame();
  addFrame.addEventListener("click", (oEvent) => {
    //добавление фрейма
    cleanCloneCanvas.width = oCanvas.width;
    cleanCloneCanvas.height = oCanvas.height;
    const addedFrame = cleanCloneCanvas.toDataURL();
    dataFrames.pushFrame(addedFrame);
    redrowListFrames(updateCurrentFrames, listFrames);
    const arrImages = document.querySelectorAll(".img-frame");
    const newIndexSelectedImg = dataFrames.getFrames().length - 1; //при добавлении выделен добавленный фрейм и на нем можно сразу рисовать
    arrImages[newIndexSelectedImg].classList.add("selectedButton");
    oCanvasContext.clearRect(0, 0, oCanvas.width, oCanvas.height);
    currentCanvasState.setCurrentSrcCanvas(
      dataFrames.getFrames()[newIndexSelectedImg]
    );
    currentCanvasState.setIdCurrentFrame(newIndexSelectedImg);
  });

  function highlightingCurrentFrame(arrImages, oEvent) {
    arrImages.forEach((frame) => {
      frame.classList.remove("selectedButton");
    });
    oEvent.target.classList.add("selectedButton");
  }

  listFrames.addEventListener("click", (oEvent) => {
    //удаление фрейма и добавление дубликата
    if (oEvent.target.classList.contains("delete")) {
      const idSelectedDeletedItem = oEvent.target.dataset.id;
      dataFrames.deleteFrame(idSelectedDeletedItem);
      redrowListFrames(updateCurrentFrames, listFrames);
      oCanvasContext.clearRect(0, 0, oCanvas.width, oCanvas.height);
    }
    if (oEvent.target.classList.contains("duplicate")) {
      const idSelectedDuplicateItem = oEvent.target.dataset.id;
      dataFrames.duplicateFrame(idSelectedDuplicateItem);
      redrowListFrames(updateCurrentFrames, listFrames);
    }
    if (oEvent.target.classList.contains("img-frame")) {
      //при клике отобразить фрейм на основном канвасе
      const arrImages = document.querySelectorAll(".img-frame");
      highlightingCurrentFrame(arrImages, oEvent);
      oCanvasContext.clearRect(0, 0, oCanvas.width, oCanvas.height);
      const idSelectedFrame = oEvent.target.dataset.id;
      currentCanvasState.setIdCurrentFrame(idSelectedFrame);
      currentCanvasState.setCurrentSrcCanvas(arrImages[idSelectedFrame].src);
      const currentSelectedImg = new Image();
      currentSelectedImg.src = currentCanvasState.getCurrentSrcCanvas();
      oCanvasContext.drawImage(
        currentSelectedImg,
        0,
        0,
        oCanvas.width,
        oCanvas.height
      );
    }
  });

  dotDrowCanvas.addEventListener("mouseup", (oEvent) => {
    const arrImages = document.querySelectorAll(".img-frame");
    const idSelectedFrame = currentCanvasState.getIdCurrentFrame(); //id selected frame
    currentCanvasState.setCurrentSrcCanvas(oCanvas.toDataURL());
    const newFrameSrc = currentCanvasState.getCurrentSrcCanvas();
    arrImages[idSelectedFrame].src = newFrameSrc;
    dataFrames.updateFrame(idSelectedFrame, newFrameSrc);
  });

  Sortable.create(listFrames, {
    handle: ".glyphicon-move",
    animation: 150,
    onEnd: function (oEvent) {
      const chosenIndexFrame = oEvent.oldIndex;
      const indexMovingFrame = oEvent.newIndex;
      dataFrames.replaceFrame(chosenIndexFrame, indexMovingFrame);
      redrowListFrames(updateCurrentFrames, listFrames);
    },
  });
}

function redrowListFrames(updateCurrentFrames, listFrames) {
  //  рендеринга списка
  const url = currentCanvasState.getCurrentBackgroundCanvas();
  listFrames.innerHTML = null;

  updateCurrentFrames.forEach((frame, index) => {
    let placeForDeleteButton =
      updateCurrentFrames.length === 1
        ? ""
        : `<button  class="deleteFrameButtons"><img data-id = ${index} class = "delete" src = "../dist/img/delete.png"></button>`;
    listFrames.insertAdjacentHTML(
      "beforeend",
      `
            <li class="wrapper-frame" style = "background-image: url(${url})">
              <div id="edit-frames-buttons">
                <button class="id-frame">${index + 1}</button>
                <button class="duplicateFrameButtons"><img data-id=${index} class = "duplicate" src = "../dist/img/duplicate.png"></button>
                 ${placeForDeleteButton}
                </div>
              <img src =${frame} data-id=${index} class = "img-frame glyphicon glyphicon-move"> 
            </li> 
        `
    );
  });
}
