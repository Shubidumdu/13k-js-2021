import { globalState } from '..';
import { titleMusic } from '../scene/title';
import { battleMusicPlay } from '../sounds/music';

let titleEventHandler: (e: KeyboardEvent) => void;

export const addTitleEventListener = () => {
  titleEventHandler = (e: KeyboardEvent) => {
    const time = performance.now();
    if (e.key === 'Enter') {
      titleMusic.stop();
      const battleMusic = battleMusicPlay();
      battleMusic.loop = true;
      globalState.sceneType = 1;
      removeTitleEventListener();
    }
  };

  window.addEventListener('keydown', titleEventHandler);
};

export const removeTitleEventListener = () => {
  window.removeEventListener('keydown', titleEventHandler);
};
