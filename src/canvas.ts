const CANVAS_BACKGROUND = '#333';

export const canvas: HTMLCanvasElement = document.getElementById(
  'canvas',
) as HTMLCanvasElement;

export const context = canvas.getContext('2d');

export function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

export function resetCanvas() {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);
}

export function draw(
  callback: (
    context: CanvasRenderingContext2D,
    canvas?: HTMLCanvasElement,
  ) => void,
) {
  context.save();
  context.beginPath();
  context.setTransform(1, 0, 0, 1, 0, 0);
  callback(context, canvas);
  context.closePath();
  context.restore();
}

export function drawShape(
  callback: (
    context: CanvasRenderingContext2D,
    canvas?: HTMLCanvasElement,
  ) => void,
) {
  context.save();
  context.beginPath();
  callback(context, canvas);
  context.closePath();
  context.restore();
}

function init() {
  canvas.style.background = CANVAS_BACKGROUND;
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
}

init();
