import { globalState } from '..';
import { titleMusic } from '../scene/title';
import { battleMusicPlay } from '../sounds/music';

let resultEventHandler: (e: KeyboardEvent) => void;

export const addResultEventListener = () => {
  resultEventHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
    }
  };

  window.addEventListener('keydown', resultEventHandler);
};

export const removeResultEventListener = () => {
  window.removeEventListener('keydown', resultEventHandler);
};
