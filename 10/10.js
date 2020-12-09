const fs = require('fs');

const data = fs.readFileSync('10/10.txt', 'UTF-8').split(/\r?\n/);
const lines = data.map(line => {
  const [x, y, vx, vy] = line.match(/-?\d+/g).map(Number);
  // const parts = line.split('> ');
  // const [x, y] = parts[0].substr(10).split(', ').map(Number);
  // const [vx, vy] = parts[1].substring(10, parts[1].length - 1).split(', ').map(Number);
  return [x, y, vx, vy];
});

const print = (lines, y0, y1, x0, x1) => {
  for (let i = y0; i < y1 + 1; i++) {
    let line = '';
    for (let j = x0; j < x1 + 1; j++) {
      if (lines.some(([px, py]) => px === j && py === i)) {
        line += '#';
      } else {
        line += '.';
      }
    }
    console.log(line);
  }
};

const SIZE = 80;
let i = 0;

while (i < 100000) {
  const xs = lines.map(p => p[0]);
  const ys = lines.map(p => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  if (minX + SIZE >= maxX && minY + SIZE >= maxY) {
    console.log(i);
    print(lines, minY, maxY, minX, maxX);
  }

  for (let i = 0; i < lines.length; i++) {
    lines[i][0] += lines[i][2];
    lines[i][1] += lines[i][3];
  }

  i++;
}
