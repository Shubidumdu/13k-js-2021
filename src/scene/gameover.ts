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

export const drawGameOver = (time: number) => {
  draw((context, canvas) => {
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = getFont();
    context.fillStyle = '#fff';
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 3;
    context.shadowColor = '#aaa';
    context.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 120);
    context.fillText(
      "Press 'S' or 'D' key to return to title",
      canvas.width / 2,
      canvas.height / 2 + 40,
    );
  });
};

export const startGameOverScene = () => {
  globalState.sceneType = 2;
  gameState.stage = 0;
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
