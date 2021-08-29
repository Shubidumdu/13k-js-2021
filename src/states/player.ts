export interface PlayerState {
  life: number;
  position: {
    x: number;
    y: number;
  };
  direction: 1 | -1; // 1 = RIGHT, -1 = LEFT
  damage: {
    start: number;
    duration: number;
  };
  collisionDamage: number;
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
    speed: number;
    position: {
      x: number;
      y: number;
    };
  };
}

export const playerState: PlayerState = {
  life: 100,
  position: {
    x: 0,
    y: 0,
  },
  collisionDamage: 10,
  direction: 1,
  attack: {
    start: -Infinity,
    position: [],
    predelay: 50,
    delay: 50,
    duration: 100,
    power: 10,
  },
  damage: {
    start: -Infinity,
    duration: 400,
  },
  move: {
    start: -Infinity,
    speed: 100,
    position: {
      x: 0,
      y: 0,
    },
  },
};
