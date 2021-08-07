import './index.scss';

// 0 => MENU, 1 => ON_GAME
let state = 0;

const canvas: HTMLCanvasElement = document.getElementById(
  'canvas',
) as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
canvas.style.background = 'black';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
  x: number;
  y: number;
  color: string;
  rotation: number;

  constructor() {
    this.x = 50;
    this.y = 50;
    this.color = 'red';
    this.rotation = 0;
  }

  rotate = () => {
    this.rotation = 0.04;
  };

  draw = () => {
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, 50, 50);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  };
}

const player = new Player();

const drawTitle = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.font = '48px sans-serif';
  ctx.strokeStyle = '#fff';
  ctx.strokeText('Title', canvas.width / 2, canvas.height / 2 - 150);
  ctx.font = '24px sans-serif';
  ctx.strokeText(
    'Press any button to start',
    canvas.width / 2,
    canvas.height / 2 + 150,
  );
};

const loop = (time: any) => {
  console.log(time);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (state === 0) drawTitle();
  if (state === 1) {
    player.draw();
  }
  requestAnimationFrame(loop);
};

loop(0);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
window.addEventListener('keydown', (e) => {
  if (state === 0) state = 1;
  if (e.key === 'ArrowRight') player.x += 10;
  if (e.key === 'ArrowLeft') player.x -= 10;
  if (e.key === 'ArrowUp') player.y -= 10;
  if (e.key === 'ArrowDown') player.y += 10;
});
