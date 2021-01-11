export default function changeValueFps(framesData){
    const fpsSlider = document.getElementById("fps-slider")
    const fpsNumber = document.getElementById("display-fps")
    fpsSlider.addEventListener("change", (oEvent)=>{
        framesData.setCurrentFps(fpsSlider.value);
        fpsNumber.textContent = `${framesData.getCurrentFps()} FPS`
    })
}