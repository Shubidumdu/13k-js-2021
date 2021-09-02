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

export const soundLazerCharge = () => {
  zzfx(
    ...[
      0.3,
      ,
      166,
      0.08,
      0.48,
      0.99,
      ,
      0.67,
      ,
      ,
      8,
      0.03,
      0.13,
      0.1,
      ,
      ,
      ,
      0.98,
      0.09,
      0.28,
    ],
  );
};

export const soundLazerShoot = () => {
  zzfx(
    ...[
      2.01,
      ,
      521,
      0.03,
      0.03,
      0.06,
      ,
      1.68,
      -7.9,
      -0.6,
      ,
      ,
      ,
      ,
      ,
      0.1,
      0.14,
      0.84,
      0.04,
      0.44,
    ],
  );
};

export const soundExplostion = () => {
  zzfx(
    ...[
      1.87,
      ,
      695,
      0.05,
      0.13,
      0.52,
      3,
      0.24,
      ,
      0.7,
      ,
      ,
      ,
      1,
      38,
      0.6,
      0.13,
      0.58,
      0.02,
    ],
  );
  // Explosion 50
};

export const soundGetFreezing = () => {
  zzfx(
    ...[
      1.15,
      ,
      76,
      ,
      0.24,
      0.08,
      ,
      1.19,
      ,
      25,
      -791,
      0.05,
      0.04,
      0.8,
      -141,
      ,
      0.12,
      ,
      0.08,
    ],
  ); // Random 209
};

export const soundIceSpike = () => {
  zzfx(
    ...[1.99, , 378, , 0.11, 0.24, , 0.42, 0.1, , -765, 0.04, , 0.4, , , 0.21],
  ); // Random 163
};

export const soundDrop = () => {
  zzfx(
    ...[, , 840, 0.05, 0.06, 0.08, , 1.06, -6.1, , , , , , , , , 0.73, 0.01],
  ); // Jump 201
};
