import { addGameEventListener } from '../events';
import { drawEnemy, EnemyState } from '../objects/enemy';
import { drawLifeBar, LifeState } from '../objects/lifeBar';
import { drawMap, MapState } from '../objects/map';
import { drawPlayer, PlayerState } from '../objects/player';
import { soundHitted } from '../sounds/effects';
import { getTimings } from '../utils';

const TILE_WIDTH = 120;
const TILE_HEIGHT = 40;
const TILE_SIZE = 4;
const ATTACK_TIME = 200;
const DAMAGE_TIME = 800;
const MOVE_TIME = 100;
const PLAYER_POWER = 10;

export interface GameState {
  life: LifeState;
  player: PlayerState;
  map: MapState;
  enemy: EnemyState;
}

const lifeState: LifeState = {
  player: 100,
  enemy: 100,
};

const playerState: PlayerState = {
  x: 0,
  y: 0,
  direction: 1,
  attack: {
    start: -Infinity,
    duration: ATTACK_TIME,
    power: PLAYER_POWER,
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

const enemyState: EnemyState = {
  x: 3,
  y: 0,
  damage: {
    start: -Infinity,
    duration: DAMAGE_TIME,
  },
};

const mapState: MapState = {
  size: TILE_SIZE,
  tileWidth: TILE_WIDTH,
  tileHeight: TILE_HEIGHT,
};

const gameState: GameState = {
  life: lifeState,
  player: playerState,
  map: mapState,
  enemy: enemyState,
};

export const updateGame = (time: number) => {
  if (enemyState.x === playerState.x && enemyState.y === playerState.y) {
    const [isTakingDamage] = getTimings({
      time,
      start: playerState.damage.start,
      duration: playerState.damage.duration,
    });
    if (isTakingDamage) return;
    lifeState.player -= 10;
    playerState.damage.start = time;
    soundHitted();
  }
};

export const drawGame = (time: number) => {
  updateGame(time);
  drawMap(gameState.map);
  drawLifeBar(gameState.life);
  drawEnemy({ time, enemy: enemyState, map: mapState, player: playerState });
  drawPlayer({
    time,
    player: playerState,
    map: mapState,
  });
};

addGameEventListener(gameState);
