export interface EnemyState {
  position: {
    x: number;
    y: number;
  };
  damage: {
    start: number;
    duration: number;
  };
  attack: {
    start: number;
    position: {
      x: number;
      y: number;
    }[];
    predelay: number;
    duration: number;
    delay: number;
    power: number;
  };
  move: {
    start: number;
    predelay: number;
    speed: number;
    position: {
      x: number;
      y: number;
    };
  };
}

export const enemyState: EnemyState = {
  position: {
    x: 3,
    y: 0,
  },
  damage: {
    start: -Infinity,
    duration: 800,
  },
  attack: {
    start: -Infinity,
    duration: 1000,
    predelay: 0,
    delay: 0,
    power: 1000,
    position: [],
  },
  move: {
    start: 0,
    predelay: 1000,
    speed: 100,
    position: {
      x: 0,
      y: 0,
    },
  },
};
