import { canvas, context, draw } from '../canvas';
import { FONT } from '../font';
import { degreeToRadian } from '../utils';

const drawRoach = () => {
  draw(() => {
    // body
    context.setTransform(1, 0, 0, 2, canvas.width / 2, canvas.height / 2);
    context.arc(0, 0, 40, 0, degreeToRadian(360));
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.fillStyle = '#6A3D3D';
    context.fill();
  });
  draw(() => {
    // eyes
    context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
    context.fillStyle = '#000';
    context.arc(-10, -40, 5, 0, degreeToRadian(360));
    context.arc(10, -40, 5, 0, degreeToRadian(360));
    context.fill();
  });
  draw(() => {
    // mouth
    context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
    context.arc(0, -20, 10, 0, degreeToRadian(180));
    context.fillStyle = '#000';
    context.fill();
  });
  draw(() => {
    // arms
    context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
    context.moveTo(-50, 0);
    context.quadraticCurveTo(-50, -20, -25, 0);
    context.moveTo(50, 0);
    context.quadraticCurveTo(50, -20, 25, 0);
    context.stroke();
  });
  draw(() => {
    // legs
    context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
    context.moveTo(-20, 50);
    context.quadraticCurveTo(-30, 80, -40, 100);
    context.moveTo(20, 50);
    context.quadraticCurveTo(30, 80, 40, 100);
    context.stroke();
  });
  draw(() => {
    // feelers
    context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
    context.moveTo(-10, -60);
    context.quadraticCurveTo(-20, -120, -40, -80);
    context.moveTo(10, -60);
    context.quadraticCurveTo(20, -120, 40, -80);
    context.stroke();
  });
};

export const drawTitle = () => {
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.font = FONT;
  drawRoach();
  draw(() => {
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