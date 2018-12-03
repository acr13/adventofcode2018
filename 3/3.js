const LENGTH_OF_FABRIC = 1000;

const _getKey = (row, col, width, height) => `${row}x${col}x${width}x${height}`;

const squares = [];
const squareByCoord = {};

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('3/input.txt'),
});
lineReader.on('line', line => parseSquare(line));
lineReader.on('close', () => main(squares));

const parseSquare = (line) => {
  const parts = line.split(' ');
  const id = parts[0].substr(1);
  const coords = parts[2].substr(0, parts[2].length - 1).split(',').map(x => parseInt(x));
  const [ col, row ] = coords;
  const dimensions = parts[3].split('x').map(x => parseInt(x));
  const [ width, height ] = dimensions;
  const square = { id, row, col, width, height };
  const key = _getKey(row, col, width, height);

  squares.push(square);
  squareByCoord[key] = square;
};

const makeEmptyFabric = n => {
  const arr = [];

  for (let i = 0; i < n; i++) {
    arr[i] = new Array(n).fill(0);
  }

  return arr;
};

const isTopLeftCorner = (fabric, row, col) => {
  if (row === 0 || col === 0) {
    return false;
  }

  if (fabric[row - 1][col - 1] === 0
    && fabric[row][col - 1] === 0 && fabric[row - 1][col] === 0) {
    return true;
  }

  return false;
};

const isNoOverlap = (fabric, row, col, width, height) => {
  const key = _getKey(row, col, width, height);
  const square = squareByCoord[key];

  if (!square) {
    return false;
  }

  // make sure this square is ALL 1s
  for (let i = row; i < (row + height); i++) {
    for (let j = col; j < (col + width); j++) {
      if (fabric[i][j] !== 1) {
        return false;
      }
    }
  }

  return true;
};

const getNoOverlapId = fabric => {
  // no overlap means there will be a square of 1's with 0's around them
  // lets find the top left corner
  for (let i = 0; i < fabric.length; i++) {
    for (let j = 0; j < fabric.length; j++) {
      if (fabric[i][j] === 1 && isTopLeftCorner(fabric, i, j)) {
        // now lets walk the width of the square, if we hit a num > 1, bail
        // if we hit a 0 - we know this side is good.
        let w = j + 1;
        let h = i + 1;

        while (fabric[i][w] === 1) { w++; }
        while (fabric[h][j] === 1) { h++; }

        const width = w - j;
        const height = h - i;
        if (isNoOverlap(fabric, i, j, width, height)) {
          const key = _getKey(i, j, width, height);
          const { id } = squareByCoord[key];
          return id;
        }
      }
    }
  }

  return false;
};

const main = (squares) => {
  const fabric = makeEmptyFabric(LENGTH_OF_FABRIC);
  let overlap = 0;
  for (let i = 0; i < squares.length; i++) {
    const square = squares[i];
    const { row, col, width, height } = square;

    for (let j = row; j < (row + height); j++) {
      for (let k = col; k < (col + width); k++) {
        fabric[j][k]++;
        if (fabric[j][k] === 2) { overlap++; }
      }
    }
  }

  console.log('Part One:', overlap);
  const noOverlapId = getNoOverlapId(fabric);
  console.log('Part Two:', noOverlapId);
};
