import { resetAllCanvas } from './canvas';
import './index.scss';
import { drawGame, startGameScene } from './scene/game';
import { drawGameOver } from './scene/gameover';
import { drawResult } from './scene/result';
import { drawTitle, startTitleScene } from './scene/title';

// 0 => TITLE
// 1 => ON_GAME
export const globalState = {
  sceneType: 0,
  music: false,
};

const loop = (time: number) => {
  resetAllCanvas();
  if (globalState.sceneType === 0) {
    drawTitle(time);
  }
  if (globalState.sceneType === 1) {
    drawGame(time);
  }
  if (globalState.sceneType === 2) {
    drawGameOver(time);
  }
  if (globalState.sceneType === 3) {
    drawResult(time);
  }
  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);

startGameScene();
