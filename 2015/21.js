/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line no-global-assign
require = require("esm")(module);
const itertools = require('js-combinatorics');

// cost damage armor
const weapons = [
  [8, 4, 0],
  [10, 5, 0],
  [25, 6, 0],
  [40, 7, 0],
  [74, 8, 0],
];
const armors = [
  [0, 0, 0],
  [13, 0, 1],
  [31, 0, 2],
  [53, 0, 3],
  [75, 0, 4],
  [102, 0, 5],
];
const rs = [
  [0, 0, 0],
  [0, 0, 0],
  [25, 1, 0],
  [50, 2, 0],
  [100, 3, 0],
  [20, 0, 1],
  [40, 0, 2],
  [80, 0, 3],
];

const rings = itertools.Combination.of(rs, 2);

const sim = (hero, boss) => {
  const p = { ...hero };
  const b = { ...boss };

  while (true) {
    b.hp -= Math.max(p.dmg - b.amr, 1);
    if (b.hp <= 0) { return true; }

    p.hp -= Math.max(b.dmg - p.amr, 1);
    if (p.hp <= 0) { return false; }
  }
};

const partOne = () => {
  let min = Infinity;
  const boss = { hp: 109, dmg: 8, amr: 2 };
  const hero = { hp: 100, dmg: 0, amr: 0 };

  for (let i = 0; i < weapons.length; i++) {
    const w = weapons[i];
    for (let j = 0; j < armors.length; j++) {
      const a = armors[j];
      for (const ring of rings) {
        const cost = w[0] + a[0] + ring[0] + ring[3];
        const dmg = w[1] + a[1] + ring[1] + ring[4];
        const amr = w[2] + a[2] + ring[2] + ring[5];
        const h = { ...hero, dmg, amr };

        if (sim(h, boss)) {
          min = Math.min(min, cost);
        }
      }
    }
  }

  return min;
};

const partTwo = () => {
  let max = -1;
  const boss = { hp: 109, dmg: 8, amr: 2 };
  const hero = { hp: 100, dmg: 0, amr: 0 };

  for (let i = 0; i < weapons.length; i++) {
    const w = weapons[i];
    for (let j = 0; j < armors.length; j++) {
      const a = armors[j];
      for (const ring of rings) {
        const cost = w[0] + a[0] + ring[0] + ring[3];
        const dmg = w[1] + a[1] + ring[1] + ring[4];
        const amr = w[2] + a[2] + ring[2] + ring[5];
        const h = { ...hero, dmg, amr };

        if (!sim(h, boss)) {
          max = Math.max(max, cost);
        }
      }
    }
  }

  return max;
};


console.log('Part one:', partOne());
console.log('Part two:', partTwo());
