import UPNG from "upng-js"
import download from "downloadjs"
import dataFrames from "./mainDataModel";

 

 export default function(){
    const saveFramesGif = document.getElementById("butt-save-gif");
    const oCanvas = document.getElementById("drawing-canvas");
    const oCanvasContext = oCanvas.getContext("2d");

    saveFramesGif.addEventListener("click",(oEvent)=>{
      console.log(dataFrames.getFrames())
      dataFrames.getFrames().forEach((imgSrc)=>{
         const image = new Image();
         image.src = imgSrc
         const dta = oCanvasContext.getImageData(0, 0, oCanvas.width, oCanvas.height).data;
         console.log(dta)
         console.log(image)

      })
         //  console.log(dta.buffer)
         //  const apng =  UPNG.encode(dta.buffer, oCanvas.width, oCanvas.height,  0)
         //   download(apng, "animation.apng", "image/apng");
   
            });

 }

 

//     function _base64ToArrayBuffer(base64) {
//       var binary_string = window.atob(base64.substring(22,base64.lenght));
//       var len = binary_string.length;
//       var bytes = new Uint8Array(len);
//       for (var i = 0; i < len; i++) {
//           bytes[i] = binary_string.charCodeAt(i);
//       }
//       return bytes.buffer;
//   }