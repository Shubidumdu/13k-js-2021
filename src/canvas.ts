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

export function draw(callback: () => void) {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.beginPath();
  callback();
  context.closePath();
}

canvas.style.background = '#333';
resizeCanvas();

window.addEventListener('resize', resizeCanvas);
