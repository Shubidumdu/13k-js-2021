import { globalState } from '..';
import { draw } from '../canvas';
import {
  addGameOverEventListener,
  removeGameOverEventListener,
} from '../events/gameover';
import { getFont } from '../font';

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
      "Press 'S' key to return to title",
      canvas.width / 2,
      canvas.height / 2 + 120,
    );
  });
};

export const startGameOverScene = () => {
  globalState.sceneType = 2;
  addGameOverEventListener();
};

export const endGameOverScene = () => {
  removeGameOverEventListener();
};
