import './css/style.css';
import './scss/style.scss';
import mainRenderer from './mainRenderer';
import toolbarSelection from './toolbarSelection';
import canvasContainer from './canvasContainer'
import toolChoiseState from './toolChoiseState';
import selectLineThickness from './selectLineThickness'
import colorPalette from './colorPalette'
import colorRightPalette from './colorRightPalette';
import settingsTool from './settingsTool';




const toolState = toolChoiseState()
mainRenderer(toolState);
toolbarSelection(toolState);
selectLineThickness(toolState);
canvasContainer(toolState);
colorPalette(toolState);
colorRightPalette(toolState);
settingsTool()
