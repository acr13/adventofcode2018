const moment = require('moment');

const input = [];

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('4/input.txt'),
});
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => main(input));

const parseLine = line => {
  const parts = line.split(' ');
  const date = parts[0].substr(1);
  const time = parts[1].substr(0, parts[1].length - 1);
  const d = moment(`${date} ${time}`);

  let action = '';

  if (parts[2] === 'falls') {
    action = 'f';
  } else if (parts[2] === 'wakes') {
    action = 'w';
  } else {
    action = `${parts[3]}`;
  }

  input.push({ date: d, action });
};

const getLongestSleepingId = (sleeps) => {
  const ids = Object.keys(sleeps);
  let maxId = ids[0];

  for (let i = 1; i < ids.length; i++) {
    if (sleeps[ids[i]].length > sleeps[maxId].length) {
      maxId = ids[i];
    }
  }

  return maxId;
};

const getMaxKey = obj => {
  const ids = Object.keys(obj);
  let max = ids[0];

  for (let i = 1; i < ids.length; i++) {
    if (obj[ids[i]] > obj[max]) {
      max = ids[i];
    }
  }

  return max;
};

const getMostSleptMinuteById = (sleepingMinutes) => {
  const freqOfSleptMinutes = getMostSleptMinutes(sleepingMinutes);
  return getMaxKey(freqOfSleptMinutes);
};

const getMostSleptMinutes = (sleepingMinutes) => {
  const freq = {};
  const n = sleepingMinutes.length;

  for (let i = 0; i < n; i++) {
    const minute = sleepingMinutes[i];
    if (!freq[minute]) { freq[minute] = 0; }
    freq[minute]++;
  }

  return freq;
};

const getMostSleptMinute = (sleeps) => {
  const ids = Object.keys(sleeps);
  let max = { id: ids[0], minute: -1, freq: -1 };

  // for each ID, determine the most slept minute
  for (let i = 0; i < ids.length; i++) {
    const thisId = ids[i];
    const freq = getMostSleptMinutes(sleeps[thisId]);
    const maxMin = getMaxKey(freq);
    const maxFreq = freq[maxMin];
    // console.log(thisId, maxMin, freq[maxMin]);

    if (maxFreq > max.freq) {
      max = { id: thisId, minute: maxMin, freq: maxFreq };
    }
  }

  return max;
};

const main = (input) => {
  const sorted = input.sort((a, b) => a.date.diff(b.date));
  const sleeps = {};
  let thisId = null;

  for (let i = 0; i < sorted.length; i++) {
    const record = sorted[i];
    if (record.action.charAt(0) === '#') {
      const id = record.action.split(' ')[0].substr(1);
      // put a new empty list if we havent seen this ID before
      if (!sleeps[id]) { sleeps[id] = []; }
      thisId = id;
    } else if (record.action === 'f') {
      const minute = record.date.minute();
      sleeps[thisId].push(minute);
    } else if (record.action === 'w') {
      // fill in minutes up until this one
      const minute = record.date.minute();
      const lastVal = sleeps[thisId][sleeps[thisId].length - 1];
      for (let nextMinute = lastVal + 1; nextMinute < minute; nextMinute++) {
        sleeps[thisId].push(nextMinute);
      }
    }
  }

  const longestSleepingId = getLongestSleepingId(sleeps);
  const mostSleptMinuteById = getMostSleptMinuteById(sleeps[longestSleepingId]);
  console.log(longestSleepingId, mostSleptMinuteById);
  console.log('Part one:', mostSleptMinuteById * longestSleepingId);

  const mostSleptMinute = getMostSleptMinute(sleeps);
  console.log('Part two:', mostSleptMinute.id * mostSleptMinute.minute);
};
