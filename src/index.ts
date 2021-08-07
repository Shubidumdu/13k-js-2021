import './index.scss';

const canvas: HTMLCanvasElement = document.getElementById(
  'canvas',
) as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
canvas.style.background = 'black';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
