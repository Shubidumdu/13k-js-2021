import { globalState } from '..';
import { gameState, startGameScene } from '../scene/game';
import { endResultScene } from '../scene/result';
import { startTitleScene, titleMusic } from '../scene/title';
import { battleMusicPlay } from '../sounds/music';

let resultEventHandler: (e: KeyboardEvent) => void;

export const addResultEventListener = () => {
  resultEventHandler = (e: KeyboardEvent) => {
    if (e.key === 's' || e.key === 'S' || e.key === 'd' || e.key === 'D') {
      if (gameState.stage < 5) {
        startGameScene();
        endResultScene();
      } else {
        startTitleScene();
        endResultScene();
      }
    }
  };

  window.addEventListener('keydown', resultEventHandler);
};

export const removeResultEventListener = () => {
  window.removeEventListener('keydown', resultEventHandler);
};
