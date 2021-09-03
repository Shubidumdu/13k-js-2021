import { draw } from '../canvas';
import { addTitleEventListener } from '../events/title';
import { getFont } from '../font';
import { titleMusicPlay } from '../sounds/music';

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
      'Press any button to start',
      canvas.width / 2,
      canvas.height / 2 + 150,
    );
  });
};

export const titleMusic = titleMusicPlay();
titleMusic.loop = true;

addTitleEventListener();
