const getContext = () => {
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
  return ctx;
};

const loop = (ms: number) => {
  requestAnimationFrame(loop);
};

const init = () => {
  const ctx = getContext();
  requestAnimationFrame(loop);
};

export default init;
