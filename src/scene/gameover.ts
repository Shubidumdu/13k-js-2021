import { globalState } from '..';
import { draw } from '../canvas';
import {
  addGameOverEventListener,
  removeGameOverEventListener,
} from '../events/gameover';
import { getFont } from '../font';
import { gameoverMusicPlay } from '../sounds/music';
import { resetEnemyState } from '../states/enemy';
import { resetPlayerState } from '../states/player';
import { gameState } from './game';

const SELECTED_TEXT_COLOR = '#D5D471';
const NORMAL_TEXT_COLOR = '#FFF';

export const gameOverState = {
  index: 0,
};

export const drawGameOver = (time: number) => {
  draw((context, canvas) => {
    context.beginPath();
    context.fillStyle = '#475644';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.closePath();
  });
  draw((context, canvas) => {
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = getFont();
    context.fillStyle = '#fff';
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 3;
    context.shadowColor = '#000';
    context.fillText(`Game Over`, canvas.width / 2, canvas.height / 2 - 40);
    context.font = getFont(18);
    if (gameOverState.index === 0) context.fillStyle = SELECTED_TEXT_COLOR;
    else context.fillStyle = NORMAL_TEXT_COLOR;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText('RETRY', canvas.width / 2 - 80, canvas.height / 2 + 40);
    context.closePath();
    context.beginPath();
    if (gameOverState.index === 1) context.fillStyle = SELECTED_TEXT_COLOR;
    else context.fillStyle = NORMAL_TEXT_COLOR;
    context.fillText('TITLE', canvas.width / 2 + 80, canvas.height / 2 + 40);
    context.closePath();
    context.beginPath();
  });
};

export const startGameOverScene = () => {
  globalState.sceneType = 2;
  gameState.stage -= 1;
  resetEnemyState();
  resetPlayerState();
  if (globalState.music) {
    gameoverMusicPlay();
  }
  addGameOverEventListener();
};

export const endGameOverScene = () => {
  removeGameOverEventListener();
};
