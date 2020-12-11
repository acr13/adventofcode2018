const fs = require('fs');

const data = fs.readFileSync('13/13.txt', 'UTF-8')
  .split(/\r?\n/)
  .map(line => line.split(''));

const sortCars = (cars) => {
  cars.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return a[0] - b[0];
  })
};

// up, right, down, left
const DR = [-1, 0, 1, 0];
const DC = [0, 1, 0, -1];

const left = (d) => (d + 3) % 4;  // backwards
const right = (d) => (d + 1) % 4; // forwards

const cars = [];

// a Car is
// [row, col, direction, number of intersections crossed]
for (let r = 0; r < data.length; r++) {
  for (let c = 0; c < data[r].length; c++) {
    if (['>', '<'].includes(data[r][c])) {
      if (data[r][c] === '>') {
        cars.push([r, c, 1, 0]);
      } else {
        cars.push([r, c, 3, 0]);
      }
      data[r][c] = '-';
    } else if (['^', 'v'].includes(data[r][c])) {
      if (data[r][c] === '^') {
        cars.push([r, c, 0, 0]);
      } else {
        cars.push([r, c, 2, 0]);
      }
      data[r][c] = '|';
    }
  }
}

let p1 = false;

while (true) {
  if (cars.length === 1) {
    console.log(`Part two: ${cars[0][1]},${cars[0][0]}`);
    return;
  }

  sortCars(cars);

  let crashed = [];

  for (let i = 0; i < cars.length; i++) {
    const [r, c, dir, intersections] = cars[i];
    const rr = r + DR[dir];
    const cc = c + DC[dir];
    let newDir = dir;
    let newInters = intersections;

    // up, right, down, left
    const cell = data[rr][cc];
    if (cell === '\\') {
      const t1 = { 0: 3, 1: 2, 2: 1, 3: 0 };
      newDir = t1[dir];
    } else if (cell === '/') {
      const t2 = { 0: 1, 1: 0, 2: 3, 3: 2 };
      newDir = t2[dir];
    } else if (cell === '+') {
      if (intersections === 0) {
        newDir = left(dir);
      } else if (intersections === 2) {
        newDir = right(dir);
      }
      newInters = (intersections + 1) % 3;
    }

    for (let j = 0; j < cars.length; j++) {
      if (cars[j][0] === rr && cars[j][1] === cc) {
        if (!p1) {
          console.log(`Part one: ${cc},${rr}`);
          p1 = true;
        }
        crashed.push(i, j);
      }
    }

    cars[i] = [rr, cc, newDir, newInters];
  }

  if (crashed.length) {
    crashed.sort((a, b) => b - a); // delete bigger one first.... omg lol
    cars.splice(crashed[0], 1);
    cars.splice(crashed[1], 1);
  }
}
