// const input = 'dabAcCaCBAcCcaDA';
let input = '';

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('5/input.txt'),
});
lineReader.on('line', line => {
  input = line;
});
lineReader.on('close', () => {
  console.log('Part One:', partOne(input));
  console.log('Part Two:', partTwo(input));
});

const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// aa == false
// Aa == true
// AA == false
// aA ==  true
const isMatch = (a, b) => {
  if (a === b) {
    return false;
  } else if (a === b.toUpperCase()) {
    return true;
  } else if (a.toUpperCase() === b) {
    return true;
  }

  return false;
};

const removeMatch = str => {
  // don't index first and last characters
  for (let i = 0; i < str.length - 1; i++) {
    const c = str.charAt(i);

    if (isMatch(c, str.charAt(i + 1))) {
      return str.substring(0, i) + str.substring(i + 2);
    }
  }

  return str;
};

const partOne = (str) => {
  let polymer = str;
  let noMatches = false;

  while (!noMatches) {
    const newPolymer = removeMatch(polymer);
    if (newPolymer.length === polymer.length) {
      noMatches = true;
    }
    polymer = newPolymer;
  }

  return polymer.length;
};

const partTwo = (str) => {
  let min = Infinity;

  for (let i = 0; i < LETTERS.length; i++) {
    const match = `(${LETTERS[i]}|${LETTERS[i].toUpperCase()})`;
    const pattern = new RegExp(match, 'g');
    const polymer = str.replace(pattern, '');
    const length = partOne(polymer);
    if (min > length) {
      min = length;
    }
  }

  return min;
};
