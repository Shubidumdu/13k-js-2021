const CANVAS_BACKGROUND = '#333';

export const gameCanvas: HTMLCanvasElement = document.getElementById(
  'game',
) as HTMLCanvasElement;

export const gameContext = gameCanvas.getContext('2d');

export const backgroundCanvas = document.getElementById(
  'background',
) as HTMLCanvasElement;

export const backgroundContext = backgroundCanvas.getContext('2d');

export function resizeCanvas() {
  gameCanvas.height = window.innerHeight;
  gameCanvas.width = window.innerWidth;
  backgroundCanvas.width = window.innerWidth;
  backgroundCanvas.height = window.innerHeight;
}

export function resetCanvas() {
  gameContext.setTransform(1, 0, 0, 1, 0, 0);
  gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}

export function draw(
  callback: (
    context: CanvasRenderingContext2D,
    canvas?: HTMLCanvasElement,
  ) => void,
) {
  gameContext.save();
  gameContext.beginPath();
  callback(gameContext, gameCanvas);
  gameContext.closePath();
  gameContext.restore();
}

function init() {
  backgroundCanvas.style.background = CANVAS_BACKGROUND;
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
}

init();
