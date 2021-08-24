import { canvas, draw } from '../canvas';
import { addGameEventListener } from '../events';
import { drawLifeBar, LifeState } from '../objects/lifeBar';
import { drawMap, MapState } from '../objects/map';
import { drawPlayer, PlayerState } from '../objects/player';
import { degreeToRadian } from '../utils';

const TILE_WIDTH = 120;
const TILE_HEIGHT = 40;
const TILE_SIZE = 4;
const ATTACK_TIME = 200;
const DAMAGE_TIME = 800;
const MOVE_TIME = 100;
const ENEMY_ATTACK1_TIME = 400;

export interface GameState {
  life: LifeState;
  player: PlayerState;
  map: MapState;
}

const lifeState: LifeState = {
  remain: 10,
};

const playerState: PlayerState = {
  x: 0,
  y: 0,
  direction: 1,
  attack: {
    start: -Infinity,
    duration: ATTACK_TIME,
  },
  damage: {
    start: -Infinity,
    duration: DAMAGE_TIME,
  },
  move: {
    start: -Infinity,
    duration: MOVE_TIME,
    before: {
      x: 0,
      y: 0,
    },
  },
};

const mapState: MapState = {
  size: TILE_SIZE,
  tileWidth: TILE_WIDTH,
  tileHeight: TILE_HEIGHT,
};

const enemyState = {
  x: 3,
  y: 0,
  attack1: 0,
};

const gameState: GameState = {
  life: lifeState,
  player: playerState,
  map: mapState,
};

export const drawGame = (time: number) => {
  drawMap(gameState.map);
  drawLifeBar(gameState.life);
  drawEnemy(enemyState.x, enemyState.y, time);
  drawPlayer({
    time,
    player: playerState,
    map: mapState,
  });
};

const drawEnemy = (x: number, y: number, time: number) => {
  const attackProgress = (time - enemyState.attack1) / ENEMY_ATTACK1_TIME;
  const isAttacking1 = attackProgress < 1 && enemyState.attack1 ? true : false;
  const positionX =
    canvas.width / 2 + (-160 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6);
  const positionY =
    canvas.height / 2 + (-20 + y * TILE_HEIGHT + Math.sin(time / 240));
  draw((context, canvas) => {
    // BODY
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    context.beginPath();
    context.arc(0, 0, 40, 0, degreeToRadian(360));
    context.fillStyle = '#6f9';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(-20, -10, 5, 0, degreeToRadian(360));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(10, -10, 5, 0, degreeToRadian(360));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
    if (isAttacking1)
      draw(() => {
        // ATTACK 1
        context.arc(-400 * attackProgress, 0, 10, 0, degreeToRadian(360));
        context.fillStyle = '#6f9';
        context.fill();
      });
  });
};

addGameEventListener(gameState);
