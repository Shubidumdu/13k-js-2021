import { enemyAttack, enemyMove } from '../actions/enemy';
import { addGameEventListener } from '../events';
import { drawEnemy, EnemyState } from '../graphic/enemy';
import { drawLifeBar, LifeState } from '../graphic/lifeBar';
import { drawMap, MapState } from '../graphic/map';
import { drawPlayer, PlayerState } from '../graphic/player';
import { soundHitted } from '../sounds/effects';
import { getTimings } from '../utils';

const TILE_WIDTH = 120;
const TILE_HEIGHT = 40;
const TILE_SIZE = 4;
const ATTACK_TIME = 200;
const DAMAGE_TIME = 800;
const MOVE_TIME = 100;
const PLAYER_POWER = 10;
const ENEMY_MOVE_SPEED = 100;
const ENEMY_MOVE_DURATION = 1000;

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
  position: {
    x: 0,
    y: 0,
  },
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
  position: {
    x: 3,
    y: 0,
  },
  damage: {
    start: -Infinity,
    duration: DAMAGE_TIME,
  },
  attack: {
    start: -Infinity,
    duration: 1000,
    predelay: 0,
    position: [],
  },
  move: {
    start: 1000,
    duration: ENEMY_MOVE_DURATION,
    speed: ENEMY_MOVE_SPEED,
    position: {
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

const gameState: GameState = {
  life: lifeState,
  player: playerState,
  map: mapState,
  enemy: enemyState,
};

export const updateGame = (time: number) => {
  // Damage
  if (
    enemyState.position.x === playerState.position.x &&
    enemyState.position.y === playerState.position.y
  ) {
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
  // Enemy Move
  if (
    (enemyState.move.position.x !== enemyState.position.x ||
      enemyState.move.position.y !== enemyState.position.y) &&
    time - enemyState.move.start >= enemyState.move.duration
  ) {
    enemyState.position = {
      ...enemyState.move.position,
    };
  }
  // Enemy Attack
  const [isEnemyAttacking] = getTimings({
    time,
    start: enemyState.attack.start + enemyState.attack.predelay,
    duration: enemyState.attack.duration,
  });
  if (isEnemyAttacking) {
    const isHitted = enemyState.attack.position.some(
      ({ x, y }) =>
        x === playerState.position.x && y === playerState.position.y,
    );
    if (isHitted) {
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
  }
};

export const drawGame = (time: number) => {
  updateGame(time);
  drawMap({ map: gameState.map, enemy: enemyState, time });
  drawLifeBar(gameState.life);
  if (enemyState.position.y > playerState.position.y) {
    drawPlayer({
      time,
      player: playerState,
      map: mapState,
    });
    drawEnemy({ time, enemy: enemyState, map: mapState, player: playerState });
  } else {
    drawEnemy({ time, enemy: enemyState, map: mapState, player: playerState });
    drawPlayer({
      time,
      player: playerState,
      map: mapState,
    });
  }
};

addGameEventListener(gameState);
enemyMove(5000, {
  enemy: enemyState,
  position: { x: 1, y: 3 },
  duration: 600,
  speed: ENEMY_MOVE_SPEED,
});
// enemyAttack(0, {
//   enemy: enemyState,
//   position: [{ x: 0, y: 0 }],
//   duration: 2000,
//   predelay: 1000,
// });
