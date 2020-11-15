function toolbarSelection(toolState) {
  const oToolbar = document.getElementById("toolbar");
  const arrButtons = document.querySelectorAll(".instruments");

  oToolbar.addEventListener("click", (oEvent) => {
    if (oEvent.target.classList.contains("instruments")) {
      arrButtons.forEach((button) => {
        button.classList.remove("selectedButton");
      });
      oEvent.target.classList.add("selectedButton");
    }
  });

  oToolbar.addEventListener("click", toolSelection, false);
  function toolSelection(oEvent) {
    if (oEvent.target.classList.contains("instruments")) {
      toolState.setProp("selectedTool", oEvent.target.id);
    }
  }
}

export default toolbarSelection;
