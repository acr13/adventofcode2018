const power = (x, y) => {
  const rackId = x + 10;
  const power = ((rackId * y) + SERIAL) * rackId;
  return Math.floor((power / 100) % 10) - 5;
};

const getGrid = () => {
  const grid = [];

  for (let i = 1; i <= SIZE; i++) {
    grid.push([]);
    for (let j = 1; j <= SIZE; j++) {
      grid[i - 1].push(power(j, i));
    }
  }

  return grid;
};

const partOne = (grid, n) => {
  let max = -1;
  let coord = [-1, -1];

  for (let y = 0; y < SIZE - n; y++) {
    for (let x = 0; x < SIZE - n; x++) {
      let sum = 0;

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          sum += grid[y + i][x + j];
        }
      }

      if (sum > max) {
        max = sum;
        coord = [x + 1, y + 1];
      }
    }
  }

  return { max, coord: coord.join(',') };
};

const partTwo = (grid) => {
  let max = -1;
  let coord = '-1,-1,-1';

  for (let i = 1; i <= 20; i++) { // 20 seems to be the reasonable max?
    const { max: sum, coord: c } = partOne(grid, i);
    if (sum > max) {
      max = sum;
      coord = `${c},${i}`;
    }
  }

  return coord;
};

const SERIAL = 7400; // input
const SIZE = 300;
const grid = getGrid();
const { coord } = partOne(grid, 3);

console.log('Part one:', coord);
console.log('Part two:', partTwo(grid));
