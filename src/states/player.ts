export interface PlayerState {
  position: {
    x: number;
    y: number;
  };
  direction: 1 | -1; // 1 = RIGHT, -1 = LEFT
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
    speed: number;
    position: {
      x: number;
      y: number;
    };
  };
}

export const playerState: PlayerState = {
  position: {
    x: 0,
    y: 0,
  },
  direction: 1,
  attack: {
    start: -Infinity,
    position: [],
    predelay: 40,
    delay: 100,
    duration: 100,
    power: 10,
  },
  damage: {
    start: -Infinity,
    duration: 800,
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
