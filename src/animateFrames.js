import dataFrames from "./mainDataModel";

export default function () {
  const animatedFrameBlock = document.getElementById("animatedFrame");

  let index = 0;
  function nextFrame(updateCurrentFrames) {
    //функция получения следующего index

    if (updateCurrentFrames[index] && index < updateCurrentFrames.length - 1) {
      index = index + 1;
      return index;
    } else if (index === updateCurrentFrames.length - 1) {
      index = 0;
      return index;
    }
  }

  step();

  function step() {
    const fps = dataFrames.getCurrentFps();
    setTimeout(function () {
      requestAnimationFrame(step);
    }, 1000 / fps);
    const updateCurrentFrames = dataFrames.getFrames();
    const newIndex = nextFrame(updateCurrentFrames);
    changeFrameFps(updateCurrentFrames, newIndex);
  }

  function changeFrameFps(updateCurrentFrames, index) {
    animatedFrameBlock.src = updateCurrentFrames[index];
  }
}
