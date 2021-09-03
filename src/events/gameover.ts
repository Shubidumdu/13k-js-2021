import { endGameOverScene } from '../scene/gameover';
import { startTitleScene } from '../scene/title';

let gameOverEventHandler: (e: KeyboardEvent) => void;

export const addGameOverEventListener = () => {
  gameOverEventHandler = (e: KeyboardEvent) => {
    if (e.key === 'S' || e.key === 's') {
      startTitleScene();
      endGameOverScene();
    }
  };

  window.addEventListener('keydown', gameOverEventHandler);
};

export const removeGameOverEventListener = () => {
  window.removeEventListener('keydown', gameOverEventHandler);
};
