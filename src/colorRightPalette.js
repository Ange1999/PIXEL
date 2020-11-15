export default function changeColorRight(toolState) {
    const palleteRight = document.getElementById("right-color");
    palleteRight.addEventListener("change", () => {
      toolState.setProp("selectedRightColor", palleteRight.value);
      console.log(palleteRight.value)
    });
  
  }
  