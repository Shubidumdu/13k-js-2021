export const layer1Canvas: HTMLCanvasElement = document.getElementById(
  'layer1',
) as HTMLCanvasElement;

export const layer2Canvas = document.getElementById(
  'layer2',
) as HTMLCanvasElement;

export const layer3Canvas: HTMLCanvasElement = document.getElementById(
  'layer3',
) as HTMLCanvasElement;

export const layer4Canvas: HTMLCanvasElement = document.getElementById(
  'layer4',
) as HTMLCanvasElement;

export function resizeCanvas() {
  layer1Canvas.height = window.innerHeight;
  layer1Canvas.width = window.innerWidth;
  layer2Canvas.width = window.innerWidth;
  layer2Canvas.height = window.innerHeight;
  layer3Canvas.width = window.innerWidth;
  layer3Canvas.height = window.innerHeight;
  layer4Canvas.width = window.innerWidth;
  layer4Canvas.height = window.innerHeight;
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

export const drawLayer1 = draw(layer1Canvas);

export const drawLayer2 = draw(layer2Canvas);

export const drawLayer3 = draw(layer3Canvas);

export const drawLayer4 = draw(layer4Canvas);

export const resetLayer1 = reset(layer1Canvas);

export const resetLayer2 = reset(layer2Canvas);

export const resetLayer3 = reset(layer3Canvas);

export const resetLayer4 = reset(layer4Canvas);

export const resetAllCanvas = () => {
  resetLayer1();
  resetLayer2();
  resetLayer3();
  resetLayer4();
};

function init() {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
}

init();
