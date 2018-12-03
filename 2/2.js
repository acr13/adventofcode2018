// const input = [
//   'abcdef',
//   'bababc',
//   'abbcde',
//   'abcccd',
//   'aabcdd',
//   'abcdee',
//   'ababab'
// ];

// const input = [
//   'abcde',
//   'fghij',
//   'klmno',
//   'pqrst',
//   'fguij',
//   'axcye',
//   'wvxyz',
// ];

const input = [];

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('2/input.txt')
});
lineReader.on('line', line => input.push(line));
lineReader.on('close', () => {
  console.log('Part One:', partOne(input));
  console.log('Part Two:', partTwo(input));
});

const partOne = ids => {
  const n = ids.length;
  let twos = 0;
  let threes = 0;

  for (let i = 0; i < ids.length; i++) {
    let haveTwo = false;
    let haveThree = false;
    let letters = getLettersOfString(ids[i]);

    Object.keys(letters).forEach(letter => {
      if (letters[letter] === 2 && !haveTwo) {
        twos++;
        haveTwo = true;
      }
      if (letters[letter] === 3 && !haveThree) {
        threes++;
        haveThree = true;
      }
    });
  }
   
  return twos * threes;
};

const getLettersOfString = word => {
  let h = {};

  for (let i = 0; i < word.length; i++) {
    let c = word.charAt(i);
    if (!h[c]) { h[c] = 0; }
    h[c]++;
  }

  return h;
};

const partTwo = ids => {
  const numIds = ids.length;

  for (let i = 0; i < numIds; i++) {
    let thisId = ids[i];
    for (let j = i + 1; j < numIds; j++) {
      let otherId = ids[j];

      const diff = numDifferentLetters(thisId, otherId);
      if (diff === 1) {
        return `${thisId} ${otherId}`;
      }
    }
  }
};

const numDifferentLetters = (s1, s2) => {
  const n = s1.length;
  let different = 0;

  for (let i = 0; i < n; i++) {
    if (s1.charAt(i) !== s2.charAt(i)) {
      different++;
    }
  }

  return different;
};

// console.log('Part One:', partOne(input));
// console.log('Part Two:', partTwo(input));