const places = [
  [154, 159],
  [172, 84],
  [235, 204],
  [181, 122],
  [161, 337],
  [305, 104],
  [128, 298],
  [176, 328],
  [146, 71],
  [210, 87],
  [341, 195],
  [50, 96],
  [225, 151],
  [86, 171],
  [239, 68],
  [79, 50],
  [191, 284],
  [200, 122],
  [282, 240],
  [224, 282],
  [327, 74],
  [158, 289],
  [331, 244],
  [154, 327],
  [317, 110],
  [272, 179],
  [173, 175],
  [187, 104],
  [44, 194],
  [202, 332],
  [249, 197],
  [244, 225],
  [52, 127],
  [299, 198],
  [123, 198],
  [349, 75],
  [233, 72],
  [284, 130],
  [119, 150],
  [172, 355],
  [147, 314],
  [58, 335],
  [341, 348],
  [236, 115],
  [185, 270],
  [173, 145],
  [46, 288],
  [214, 127],
  [158, 293],
  [237, 311],
];

const distance = ([x1, y1], [x2, y2]) => Math.abs(x2 - x1) + Math.abs(y2 - y1);

const partOne = places => {
  // get the size of our 'infinite' grid
  const GRID_SIZE = places.reduce((max, coord) => {
    const coordMax = Math.max(...coord);
    return (coordMax > max) ? coordMax : max;
  }, -1) + 1;

  // create a grid of [max, max] with '.'
  const grid = new Array(GRID_SIZE);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(GRID_SIZE).fill('.');
  }

  // for each point.. find who we are closest too
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const distances = places.map(pair => distance(pair, [j, i]));
      const shortest = Math.min(...distances);
      const numShortest = distances.filter(x => x === shortest).length;

      // no ties
      if (numShortest === 1) {
        // put the 'place index' here
        grid[i][j] = distances.indexOf(shortest);
      }
    }
  }

  // ignore the perimeter values
  const ignore = new Set();
  for (let i = 0; i < GRID_SIZE; i++) {
    ignore.add(grid[0][i]);
    ignore.add(grid[i][0]);
    ignore.add(grid[i][GRID_SIZE - 1]);
    ignore.add(grid[GRID_SIZE - 1][i]);
  }

  const sizes = new Array(places.length).fill(0);
  for (let i = 1; i < GRID_SIZE - 1; i++) {
    for (let j = 1; j < GRID_SIZE - 1; j++) {
      const point = grid[i][j];
      if (!ignore.has(point) && grid[i][j] !== '.') {
        sizes[point]++;
      }
    }
  }

  return Math.max(...sizes);
};

const partTwo = (places, targetTotalDistance) => {
  // get the size of our 'infinite' grid
  const GRID_SIZE = places.reduce((max, coord) => {
    const coordMax = Math.max(...coord);
    return (coordMax > max) ? coordMax : max;
  }, -1) + 1;

  const grid = new Array(GRID_SIZE);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(GRID_SIZE).fill(0);
  }

  // simply count spaces less than the threshold
  let area = 0;

  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const distances = places.map(pair => distance(pair, [j, i]));
      const totalDistance = distances.reduce((sum, val) => sum + val, 0);

      if (totalDistance < targetTotalDistance) {
        area++;
      }
    }
  }

  return area;
};

console.log('Part one:', partOne(places));
console.log('Part two:', partTwo(places, 10000));
