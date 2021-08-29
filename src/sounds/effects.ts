import zzfx from '../zzfx';

export const soundLightSaber = () => {
  zzfx(
    ...[
      ,
      ,
      334,
      ,
      0.08,
      0.09,
      2,
      1.52,
      -7.8,
      2.1,
      ,
      ,
      0.02,
      0.2,
      -28,
      ,
      ,
      0.65,
      0.1,
    ],
  );
};

export const soundPlayerHitted = () => {
  zzfx(
    ...[
      2.19,
      ,
      ,
      ,
      ,
      0.11,
      3,
      0.1,
      -3.7,
      0.8,
      ,
      ,
      0.19,
      0.5,
      ,
      0.4,
      0.19,
      0.87,
      0.06,
      0.18,
    ],
  );
};

export const soundEnemyHitted = () => {
  zzfx(
    ...[1.01, , 376, , , 0.11, 1, 1.65, -8.2, , , , , 0.4, , 0.1, , 0.93, 0.04],
  ); // Hit 138
};
