import './css/style.css';
import mainRenderer from './mainRenderer';
import toolbarSelection from './toolbarSelection';
import canvasContainer from './canvasContainer'
import toolChoiseState from './toolChoiseState';
import selectLineThickness from './selectLineThickness'
import colorPalette from './colorPalette'
import settingsTool from './settingsTool';
import rendererFrames from './listRendererFrames';
import framesDataState from './mainDataModel';
import selectValueFps from './selectFps';
import animation from './animateFrames'
import canvasState from './canvasState' //данные канваса
import changeCanvasSize from './changeCanvasSize'
import exportFrames from './exportFrames'

const toolState = toolChoiseState();
const canvasDataState = canvasState();

mainRenderer(toolState,framesDataState); 
selectValueFps(framesDataState)

selectValueFps(framesDataState)
toolbarSelection(toolState);
selectLineThickness(toolState);
canvasContainer(toolState);
colorPalette(toolState);
settingsTool(toolState);
rendererFrames();
animation();

//changeCanvasSize();
//exportFrames();



