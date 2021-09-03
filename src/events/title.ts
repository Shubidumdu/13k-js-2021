import { globalState } from '..';

let titleEventHandler: (e: KeyboardEvent) => void;

export const addTitleEventListener = () => {
  titleEventHandler = (e: KeyboardEvent) => {
    const time = performance.now();
    if (e.key === 'Enter') {
      globalState.sceneType = 1;
      removeTitleEventListener();
    }
  };

  window.addEventListener('keydown', titleEventHandler);
};

export const removeTitleEventListener = () => {
  window.removeEventListener('keydown', titleEventHandler);
};
