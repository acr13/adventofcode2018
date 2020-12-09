const fs = require('fs');

const data = fs.readFileSync('12/12.txt', 'UTF-8').split(/\r?\n/);
const state = data[0].split(': ')[1];

const rules = {};
for (let i = 2; i < data.length; i++) {
  const [left, right] = data[i].split(' => ');
  rules[left] = right;
}

const grow = (s, rules, n) => {
  let generations = 0;
  let state = s;
  let sum = 0;
  let lastSum = 0;
  let lastDiff = 0;
  let streak = 0;

  while (generations < n) {
    generations++;
    const paddedState = `....${state}....`;
    let newState = '';
    sum = 0;

    for (let i = 2; i <= paddedState.length; i++) {
      const pot = rules[paddedState.substr(i - 2, 5)] || '.';
      if (pot === '#') {
        sum = sum + i + ((generations * -2) - 2);
      }
      newState += pot;
    }

    state = newState;

    // console.log(sum, lastSum, lastDiff);

    // keep track of the previous sum, and the diff between them
    // if we hit the same difference for 3 in a row, lets assume
    // we've hit a 'constant' state (sum will keep growing by the same amount)
    if (sum - lastSum === lastDiff) {
      streak++;
      if (streak === 3) {
        return (n - generations) * lastDiff + sum;
      }
    } else {
      lastDiff = sum - lastSum;
      streak = 0;
    }

    lastSum = sum;
  }

  return sum;
};

console.log('Part one:', grow(state, rules, 20));
console.log('Part two:', grow(state, rules, 50000000000));
