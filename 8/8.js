// let input = [2,3,0,3,10,11,12,1,1,0,1,99,2,1,1,2];
// const input = [0,3,10,11,12];
// const input = [1,1,0,1,99,2];

let input = [];
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('8/input.txt'),
});
lineReader.on('line', line => { input = line.split(' ').map(Number); });
lineReader.on('close', () => {
  const input2 = input.slice();
  console.log('Part one:', part1(input));
  console.log('Part two:', part2(input2));
});

const part1 = (list) => {
  const children = list.shift();
  const metadata = list.shift();

  let sum = 0;

  for (let i = 0; i < children; i++) {
    sum += part1(list);
  }

  for (let i = 0; i < metadata; i++) {
    sum += list.shift();
  }

  return sum;
};

const part2 = (list) => {
  const children = list.shift();
  const metadata = list.shift();

  // base case, no children
  if (children === 0) {
    let sum = 0;
    for (let i = 0; i < metadata; i++) {
      sum += list.shift();
    }
    return sum;
  } else { // sum of child nodes
    const childrenValues = [];
    for (let i = 0; i < children; i++) {
      childrenValues.push(part2(list));
    }

    const metadataValues = [];
    for (let i = 0; i < metadata; i++) {
      metadataValues.push(list.shift());
    }

    // for each metadata, get the value of that idx
    let sum = 0;
    for (let i = 0; i < metadataValues.length; i++) {
      let idx = metadataValues[i] - 1;
      if (idx >= 0 && idx < childrenValues.length) {
        sum += childrenValues[idx];
      }
    }
    return sum;
  }
};
