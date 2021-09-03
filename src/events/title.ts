import { globalState } from '..';
import { startGameScene } from '../scene/game';
import { endTitleScene, startTitleMusic, stopTitleMusic } from '../scene/title';

let titleEventHandler: (e: KeyboardEvent) => void;

export const addTitleEventListener = () => {
  titleEventHandler = (e: KeyboardEvent) => {
    if (e.key === 's' || e.key === 'S') {
      startGameScene();
      endTitleScene();
    }
    if (e.key === 'm' || e.key === 'M') {
      globalState.music = !globalState.music;
      if (globalState.music) {
        startTitleMusic();
      } else {
        stopTitleMusic();
      }
    }
  };

  window.addEventListener('keydown', titleEventHandler);
};

export const removeTitleEventListener = () => {
  window.removeEventListener('keydown', titleEventHandler);
};
