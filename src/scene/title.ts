import { globalState } from '..';
import { draw } from '../canvas';
import {
  addTitleEventListener,
  removeTitleEventListener,
} from '../events/title';
import { getFont } from '../font';
import { resultMusicPlay, titleMusicPlay } from '../sounds/music';

export const updateTitle = () => {};

export const drawTitle = (time: number) => {
  draw((context, canvas) => {
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = getFont();
    context.fillStyle = '#fff';
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 3;
    context.shadowColor = '#aaa';
    context.fillText('ASTROACH', canvas.width / 2, canvas.height / 2 - 150);
    context.fillText(
      "Press 'S' or 'D' key to start",
      canvas.width / 2,
      canvas.height / 2 + 40,
    );
    context.fillText(
      "Press 'M' to toggle music",
      canvas.width / 2,
      canvas.height / 2 + 120,
    );
  });
};

export let titleMusic: AudioBufferSourceNode;

export const startTitleMusic = () => {
  titleMusic = titleMusicPlay();
  titleMusic.loop = true;
};

export const stopTitleMusic = () => {
  titleMusic.stop();
};

export const startTitleScene = () => {
  globalState.sceneType = 0;
  if (globalState.music) startTitleMusic();
  addTitleEventListener();
};

export const endTitleScene = () => {
  titleMusic?.stop();
  if (globalState.music) stopTitleMusic();
  removeTitleEventListener();
};
