const data = {
  pictureArr: [],

  currentFps: 1,
};

  function getCurrentFps() {
    return data.currentFps;
  }
  function setCurrentFps(value) {
    data.currentFps = value;
  }

  function updateFrame(index,src){
    data.pictureArr[index] = src;
  }

  function getFrames() {
    return data.pictureArr;
  }

  function deleteFrame(index) {
    data.pictureArr.splice(index, 1);
  }

  function pushFrame(frame) {
    data.pictureArr.push(frame);
  }
  function pushFrames(arrFrames) {
    arrFrames.map((frame)=>pushFrame(frame));
  }

  function duplicateFrame(index) {
    const duplicateFrame = data.pictureArr[index];
    data.pictureArr.splice(index, 0, duplicateFrame);
  }

  function replaceFrame(chosenIndexFrame, indexMovingFrame) {
    const selectedFrame = data.pictureArr[chosenIndexFrame];
    data.pictureArr.splice(chosenIndexFrame, 1);
    data.pictureArr.splice(indexMovingFrame, 0, selectedFrame);
  }

  export default {
    getFrames: getFrames,
    pushFrame: pushFrame,
    deleteFrame: deleteFrame,
    duplicateFrame: duplicateFrame,
    replaceFrame: replaceFrame,
    getCurrentFps: getCurrentFps,
    setCurrentFps: setCurrentFps,
    updateFrame:updateFrame,
    pushFrames:pushFrames,
  };

