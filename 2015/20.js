const TARGET = 29000000;
               11675827

// get the divisors, then *10 each and sum
const presents1 = (num) => {
  const ds = [1];
  const half = Math.floor(num / 2);
  let i;
  let j;

  // Determine our increment value for the loop and starting point.
  if (num % 2 === 0) {
    i = 2;
    j = 1;
  } else {
    i = 3;
    j = 2;
  }

  for (i; i <= half; i += j) {
    if (num % i === 0) ds.push(i);
  }

  if (!ds.includes(num)) {
    ds.push(num); // Always include the original number.
  }

  return ds.map(d => d * 10).reduce((sum, n) => sum + n, 0);
};

const partOne = () => {
  let i = 665200;
  while (true) {
    const ps = presents1(i); // 665280

    if (ps >= TARGET) {
      return i;
    }

    i++;
  }
};

const presents2 = (num) => {
  let sum = 0;
  const sq = Math.sqrt(num) + 1;

  for (let i = 0; i < sq; i++) {
    if (num % i === 0) {
      if (i <= 50) {
        sum += num / i;
      } if (num / i < 50) {
        sum += i;
      }
    }
  }

  return sum * 11;
};

const partTwo = () => {
  let i = 705200;
  while (true) {
    const ps = presents2(i);
    if (ps >= TARGET) {
      return i;
    }
    i++;
  }
};

console.log('Part one:', partOne());
console.log('Part two:', partTwo());
