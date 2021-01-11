
const canvasData = {
  picture: ``,
  selectedFrameId: "",
  selectedColorGrid: `../dist/img/grid.png`,
};

export default function () {
  function getCurrentSrcCanvas() {
    return canvasData.picture;
  }
  function setCurrentSrcCanvas(value) {
     canvasData.picture = value;
  }
  function setIdCurrentFrame(value) {
    canvasData.selectedFrameId = value;
 }
 function getIdCurrentFrame() {
  return canvasData.selectedFrameId
}
function getCurrentBackgroundCanvas() {
  return canvasData.selectedColorGrid;
}
function setCurrentBackgroundCanvas(src) {
   canvasData.selectedColorGrid = src;
}

return {
    getCurrentSrcCanvas: getCurrentSrcCanvas,
    setCurrentSrcCanvas: setCurrentSrcCanvas,
    getIdCurrentFrame: getIdCurrentFrame,
    setIdCurrentFrame: setIdCurrentFrame,
    getCurrentBackgroundCanvas: getCurrentBackgroundCanvas,
    setCurrentBackgroundCanvas: setCurrentBackgroundCanvas,
}
}
