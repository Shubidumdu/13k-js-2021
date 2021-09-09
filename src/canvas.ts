export const gameCanvas: HTMLCanvasElement = document.getElementById(
  'game',
) as HTMLCanvasElement;

export const backgroundCanvas = document.getElementById(
  'background',
) as HTMLCanvasElement;

export const uiCanvas: HTMLCanvasElement = document.getElementById(
  'ui',
) as HTMLCanvasElement;

export const mapCanvas: HTMLCanvasElement = document.getElementById(
  'map',
) as HTMLCanvasElement;

export function resizeCanvas() {
  gameCanvas.height = window.innerHeight;
  gameCanvas.width = window.innerWidth;
  backgroundCanvas.width = window.innerWidth;
  backgroundCanvas.height = window.innerHeight;
  uiCanvas.width = window.innerWidth;
  uiCanvas.height = window.innerHeight;
  mapCanvas.width = window.innerWidth;
  mapCanvas.height = window.innerHeight;
}

function draw(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');

  return (
    callback: (
      context: CanvasRenderingContext2D,
      canvas?: HTMLCanvasElement,
    ) => void,
  ) => {
    context.save();
    context.beginPath();
    callback(context, canvas);
    context.closePath();
    context.restore();
  };
}

function reset(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');

  return () => {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
}

export const drawGame = draw(gameCanvas);

export const drawBackground = draw(backgroundCanvas);

export const drawUI = draw(uiCanvas);

export const drawMap = draw(mapCanvas);

export const resetGame = reset(gameCanvas);

export const resetBackground = reset(backgroundCanvas);

export const resetUI = reset(uiCanvas);

export const resetMap = reset(mapCanvas);

export const resetAllCanvas = () => {
  resetGame();
  resetBackground();
  resetUI();
  resetMap();
};

function init() {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
}

init();
