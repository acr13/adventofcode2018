/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const input = fs.readFileSync('2015/19.txt', 'UTF-8').split(/\r?\n/)

const word = input.pop();
input.pop();
const replacements = input.map((rule) => rule.split(' => '));


const partOne = (word, replacements) => {
  const seen = new Set();

  for (let i = 0; i < replacements.length; i++) {
    const [left, right] = replacements[i];

    for (let c = 0; c < word.length; c++) {
      if (word.substring(c, c + left.length) === left) {
        const newWord = `${word.substring(0, c)}${right}${word.substring(c + left.length)}`;
        seen.add(newWord);
      }
    }
  }

  return seen.size;
};

const partTwo = (word, replacements) => {
  let target = word;
  let steps = 0;

  while (target !== 'e') {
    for (let i = 0; i < replacements.length; i++) {
      const [left, right] = replacements[i];
      const pos = target.indexOf(right);

      if (pos !== -1) {
        target = target.substring(0, pos) + left + target.substring(pos + right.length);
        steps++;
      }
    }
  }

  return steps;
};

console.log('Part one:', partOne(word, replacements));
console.log('Part two:', partTwo(word, replacements));
