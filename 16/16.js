const fs = require('fs');
const input = fs.readFileSync('16/16.txt', 'UTF-8');

const p1 = (input) => {
    let lines = input.split('\n');

    let threeCount = 0;

    while(true) {
        let before = lines.shift();

        if(!/^Before/.test(before)) {
            break;
        }

        let argString = before.split('[')[1];
        argString = argString.substring(0, argString.length - 1);
        let beforeArgs = argString.split(', ').map(x => +x);

        let opString = lines.shift();
        let opArgs = opString.split(' ').map(x => +x);

        let after = lines.shift();
        argString = after.split('[')[1];
        argString = argString.substring(0, argString.length - 1);
        let afterArgs = argString.split(', ').map(x => +x);
        lines.shift();

        let matchCount = 0;

        let aReg = beforeArgs[opArgs[1]];
        let bReg = beforeArgs[opArgs[2]];
        let aVal = opArgs[1];
        let bVal = opArgs[2];
        let cVal = opArgs[3];

        //addr
        let candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg + bReg;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //addi
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg + bVal;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //mulr
        candidates= beforeArgs.slice(0);
        candidates[cVal] = aReg * bReg;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //muli
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg * bVal;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //banr
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg & bReg;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //bani
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg & bVal;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //borr
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg | bReg;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //bori
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg | bVal;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //setr
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //seti
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aVal;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //gtir
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aVal > bReg ? 1 : 0;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //gtri
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg > bVal ? 1 : 0;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //gtrr
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg > bReg ? 1 : 0;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //eqir
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aVal === bReg ? 1 : 0;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //eqri
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg === bVal ? 1 : 0;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //eqrr
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg === bReg ? 1 : 0;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        if(matchCount >= 3) {
            threeCount++;
        }
    }

    return threeCount;
};

const p2 = (input) => {
  const ops = {
    addr: (reg, a, b) => reg[a] + reg[b],
    addi: (reg, a, b) => reg[a] + b,
    mulr: (reg, a, b) => reg[a] * reg[b],
    muli: (reg, a, b) => reg[a] * b,
    banr: (reg, a, b) => reg[a] & reg[b],
    bani: (reg, a, b) => reg[a] & b,
    borr: (reg, a, b) => reg[a] | reg[b],
    bori: (reg, a, b) => reg[a] | b,
    setr: (reg, a, b) => reg[a],
    seti: (reg, a, b) => a,
    gtir: (reg, a, b) => a > reg[b] ? 1 : 0,
    gtri: (reg, a, b) => reg[a] > b ? 1 : 0,
    gtrr: (reg, a, b) => reg[a] >  reg[b] ? 1 : 0,
    eqir: (reg, a, b) => a === reg[b] ? 1 : 0,
    eqri: (reg, a ,b) => reg[a] === b ? 1 : 0,
    eqrr: (reg, a, b) => reg[a] === reg[b] ? 1 : 0
  };

  let lines = input.split('\n');

  let opCandidates = {};

  for(let opCode in ops) {
      opCandidates[opCode] = [];
  }

  while(true) {
      let before = lines.shift();

      if(!/^Before/.test(before)) {
          break;
      }

      let argString = before.split('[')[1];
      argString = argString.substring(0, argString.length - 1);
      let beforeArgs = argString.split(', ').map(x => +x);

      let opString = lines.shift();
      let opArgs = opString.split(' ').map(x => +x);

      let after = lines.shift();
      argString = after.split('[')[1];
      argString = argString.substring(0, argString.length - 1);
      let afterArgs = argString.split(', ').map(x => +x);
      lines.shift();

      for(let opCode in ops) {
          let candidates = beforeArgs.slice(0);
          candidates[opArgs[3]] = ops[opCode](candidates, opArgs[1], opArgs[2]);

          if(candidates.join(',') === afterArgs.join(',')) {
              if(opCandidates[opCode].indexOf(opArgs[0]) === -1) {
                  opCandidates[opCode].push(opArgs[0]);
              }
          }
      }
  }

  let foundInstructions = 0;

  let opCodes = {};

  while(foundInstructions < 16) {
      for(let opCode in opCandidates) {
          if(opCandidates[opCode].length === 1) {
              let foundNum = opCandidates[opCode][0];
              foundInstructions++;
              opCodes[foundNum] = opCode;

              for(let opCode2 in opCandidates) {
                  let index = opCandidates[opCode2].indexOf(foundNum);
                  if(index > -1) {
                      opCandidates[opCode2].splice(index, 1);
                  }
              }
          }
      }

      for(let i = 0; i < 16; i++) {
          let foundCount = 0;
          let foundCode = '';

          for(let opCode in opCandidates) {
              if(opCandidates[opCode].indexOf(i) >= 0) {
                  foundCount++;
                  foundCode = opCode;
              }
          }

          if(foundCount === 1) {
              foundInstructions++;
              opCodes[i] = foundCode;

              for(let opCode in opCandidates) {
                  let index = opCandidates[opCode].indexOf(i);
                  if(index >= 0) {
                      opCandidates[opCode].splice(index, 1);
                  }
              }
              opCandidates[foundCode] = [];
          }
      }
  }

  lines.shift();
  lines.shift();

  let registers = [0, 0, 0, 0];

  while(lines.length) {
      let line = lines.shift();
      let args = line.split(' ').map(x => +x);

      let opCode = opCodes[args[0]];
      registers[args[3]] = ops[opCode](registers, args[1], args[2]);
  }

  return registers[0];
};

console.log('Part one:', p1(input));
console.log('Part two:', p2(input));