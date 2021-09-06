import { globalState } from '..';
import { startGameScene } from '../scene/game';
import {
  endTitleScene,
  startTitleMusic,
  stopTitleMusic,
  titleState,
} from '../scene/title';
import { soundCursor } from '../sounds/effects';

let titleEventHandler: (e: KeyboardEvent) => void;

export const addTitleEventListener = () => {
  titleEventHandler = (e: KeyboardEvent) => {
    if (titleState.openGuide) {
      if (e.key === 's' || e.key === 'S' || e.key === 'd' || e.key === 'D') {
        soundCursor();
        titleState.openGuide = false;
      }
      return;
    }
    if (e.key === 'ArrowLeft') {
      if (titleState.index === 0) return;
      else {
        titleState.index -= 1;
        soundCursor();
      }
    }
    if (e.key === 'ArrowRight') {
      if (titleState.index === 2) return;
      else {
        titleState.index += 1;
        soundCursor();
      }
    }
    if (e.key === 's' || e.key === 'S' || e.key === 'd' || e.key === 'D') {
      soundCursor();
      if (titleState.index === 0) {
        startGameScene();
        endTitleScene();
      }
      if (titleState.index === 1) {
        globalState.music = !globalState.music;
        if (globalState.music) {
          startTitleMusic();
        } else {
          stopTitleMusic();
        }
      }
      if (titleState.index === 2) {
        titleState.openGuide = true;
      }
    }
    if (e.key === 'm' || e.key === 'M') {
    }
  };

  window.addEventListener('keydown', titleEventHandler);
};

export const removeTitleEventListener = () => {
  window.removeEventListener('keydown', titleEventHandler);
};
