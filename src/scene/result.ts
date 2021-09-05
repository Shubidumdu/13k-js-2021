import { globalState } from '..';
import { draw } from '../canvas';
import {
  addResultEventListener,
  removeResultEventListener,
} from '../events/result';
import { getFont } from '../font';
import { resultMusicPlay } from '../sounds/music';
import { gameState } from './game';

export let resultMusic: AudioBufferSourceNode;

export const drawResult = (time: number) => {
  draw((context, canvas) => {
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = getFont();
    context.fillStyle = '#fff';
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 3;
    context.shadowColor = '#aaa';
    context.fillText(
      `Stage ${gameState.stage} Clear`,
      canvas.width / 2,
      canvas.height / 2 - 120,
    );
    if (gameState.stage === 5) {
      context.fillText(
        `Thank you for playing!`,
        canvas.width / 2,
        canvas.height / 2 + 40,
      );
      context.fillText(
        `Press 'S' or 'D' key to go title`,
        canvas.width / 2,
        canvas.height / 2 + 80,
      );
    } else
      context.fillText(
        `Press 'S' or 'D' key to go next stage`,
        canvas.width / 2,
        canvas.height / 2 + 40,
      );
  });
};

export const startResultScene = () => {
  globalState.sceneType = 3;
  if (globalState.music) {
    resultMusic = resultMusicPlay();
    resultMusic.loop = true;
  }
  addResultEventListener();
};

export const endResultScene = () => {
  if (globalState.music) {
    resultMusic.stop();
  }
  removeResultEventListener();
};
