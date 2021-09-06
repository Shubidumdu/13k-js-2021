import { globalState } from '..';
import { draw } from '../canvas';
import {
  addResultEventListener,
  removeResultEventListener,
} from '../events/result';
import { getFont } from '../font';
import { resultMusicPlay } from '../sounds/music';
import { playerState } from '../states/player';
import { degreeToRadian } from '../utils';
import { gameState } from './game';

const SELECTED_TEXT_COLOR = '#D5D471';
const NORMAL_TEXT_COLOR = '#FFF';

export const resultState = {
  startTime: 0,
  index: 0,
};

export let resultMusic: AudioBufferSourceNode;

export const drawResult = (time: number) => {
  const wave = Math.sin(time / 60);
  const gameTime = Math.round(gameState.scoreTime);
  const second = gameTime / 1000;
  const minute = Math.floor(second / 60);
  draw((context, canvas) => {
    context.beginPath();
    context.fillStyle = '#475644';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.closePath();
  });
  draw((context, canvas) => {
    // BODY
    context.setTransform(1, 0, 0, 1, canvas.width / 2 - 180, canvas.height / 2);
    context.ellipse(0, 10 * wave, 30, 60, 0, 0, 2 * Math.PI);
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.fillStyle = '#6A3D3D';
    context.fill();
  });
  draw((context, canvas) => {
    // MOUTH
    context.setTransform(
      1,
      0,
      0,
      1,
      canvas.width / 2 - 170,
      canvas.height / 2 + 10 * wave,
    );
    context.arc(0, wave, 8, 0, degreeToRadian(180));
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.fillStyle = '#000';
    context.fill();
  });
  draw((context, canvas) => {
    // EYES
    context.setTransform(
      1,
      0,
      0,
      1,
      canvas.width / 2 - 180,
      canvas.height / 2 + 10 * wave,
    );
    context.arc(0, -20 + wave, 4, 0, degreeToRadian(360));
    context.arc(20, -20 + wave, 4, 0, degreeToRadian(360));
    context.fillStyle = '#000';
    context.fill();
  });
  draw((context, canvas) => {
    // ARMS
    context.setTransform(
      1,
      0,
      0,
      1,
      canvas.width / 2 - 180,
      canvas.height / 2 + 10 * wave,
    );
    context.moveTo(-15, -10 + wave);
    context.quadraticCurveTo(20, 20 + 10 * wave, 35, 10 + 30 * wave);
    context.moveTo(30, -10 + wave);
    context.quadraticCurveTo(50, 20 - 10 * wave, 65, 10 - 30 * wave);
    context.stroke();
  });
  draw((context, canvas) => {
    // LEGS
    context.setTransform(
      1,
      0,
      0,
      1,
      canvas.width / 2 - 180,
      canvas.height / 2 + 20,
    );
    context.moveTo(-10, 20 + 10 * wave);
    context.quadraticCurveTo(10 + 10 * wave, 40 - 10 * wave, -10, 68);
    context.moveTo(14, 20 + 10 * wave);
    context.quadraticCurveTo(48 + 10 * wave, 40 - 10 * wave, 20, 60);
    context.stroke();
  });
  draw((context, canvas) => {
    // FEELERS
    context.setTransform(
      1,
      0,
      0,
      1,
      canvas.width / 2 - 174,
      canvas.height / 2 - 20,
    );
    context.moveTo(-10, -28 + 10 * wave);
    context.quadraticCurveTo(
      10 + 5 * wave,
      -80 + 5 * wave,
      -24 + 10 * wave,
      -60 - 10 * wave,
    );
    context.moveTo(10, -28 + 10 * wave);
    context.quadraticCurveTo(
      40 + 5 * wave,
      -80 + 5 * wave,
      1 + 10 * wave,
      -60 - 10 * wave,
    );
    context.stroke();
  });
  draw((context, canvas) => {
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = getFont();
    context.fillStyle = '#fff';
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 3;
    context.shadowColor = '#000';
    context.fillText(
      `Stage ${gameState.stage} Clear`,
      canvas.width / 2,
      canvas.height / 2 - 160,
    );
    context.font = getFont(18);
    context.fillText(
      `Time : ${minute.toString().padStart(2, '0')}:${second
        .toFixed(2)
        .padStart(5, '0')}`,
      canvas.width / 2 + 40,
      canvas.height / 2 - 20,
    );
    context.fillText(
      `Rest life : ${playerState.life.toString().padStart(2, '0')}%`,
      canvas.width / 2 + 40,
      canvas.height / 2 + 40,
    );
    if (gameState.stage === 5) {
      context.fillText(
        `Thank you for playing!`,
        canvas.width / 2,
        canvas.height / 2 - 220,
      );
    }
    if (resultState.index === 0) context.fillStyle = SELECTED_TEXT_COLOR;
    else context.fillStyle = NORMAL_TEXT_COLOR;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    if (gameState.stage === 5)
      context.fillText('TITLE', canvas.width / 2 - 80, canvas.height / 2 + 160);
    else
      context.fillText('NEXT', canvas.width / 2 - 80, canvas.height / 2 + 160);
    context.closePath();
    context.beginPath();
    if (resultState.index === 1) context.fillStyle = SELECTED_TEXT_COLOR;
    else context.fillStyle = NORMAL_TEXT_COLOR;
    context.fillText('RETRY', canvas.width / 2 + 80, canvas.height / 2 + 160);
    context.closePath();
    context.beginPath();
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
