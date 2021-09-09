import { gameState, startGameScene } from '../scene/game';
import { endGameOverScene, gameOverState } from '../scene/gameover';
import { startTitleScene } from '../scene/title';
import { soundCursor } from '../sounds/effects';
import { enemyState, resetEnemyState } from '../states/enemy';

let gameOverEventHandler: (e: KeyboardEvent) => void;

export const addGameOverEventListener = () => {
  gameOverEventHandler = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      if (gameOverState.index === 0) return;
      else {
        gameOverState.index -= 1;
        soundCursor();
      }
    }
    if (e.key === 'ArrowRight') {
      if (gameOverState.index === 1) return;
      else {
        gameOverState.index += 1;
        soundCursor();
      }
    }
    if (e.key === 'S' || e.key === 's' || e.key === 'd' || e.key === 'D') {
      if (gameOverState.index === 0) {
        startGameScene();
        endGameOverScene();
      }
      if (gameOverState.index === 1) {
        gameState.stage = 0;
        startTitleScene();
        endGameOverScene();
      }
    }
  };

  window.addEventListener('keydown', gameOverEventHandler);
};

export const removeGameOverEventListener = () => {
  window.removeEventListener('keydown', gameOverEventHandler);
};
