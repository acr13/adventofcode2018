const input = [];

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('1/input.txt')
});
lineReader.on('line', line => input.push(parseInt(line)));
lineReader.on('close', () => {
  console.log('Part One:', partOne(input));
  console.log('Part Two:', partTwo(input));
});

const partOne = (input) => input.reduce((sum, val) => sum += val, 0);
const partTwo = (input) => {
  let f = 0;
  const freqs = { [f]: true };

  while (true) {
    for (let i = 0; i < input.length; i++) {
      f += input[i];
      if (freqs[f]) { return f; }
      freqs[f] = true;
    }
  }
};
