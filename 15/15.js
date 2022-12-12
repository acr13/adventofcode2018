const fs = require('fs');
const input = fs.readFileSync('15/15.txt', 'UTF-8');

const parser = (data) => {
  let lines = data.split('\n');
  let grid = [];
  let combatants = [];
  let y = 0;

  for (let i = 0; i < lines[0].length; i++) {
    grid.push([]);
  }

  for (let line of lines) {
    for(let x = 0; x < line.length; x++) {
      grid[x][y] = (line[x] === '#');

      if (line[x] === 'E') {
        combatants.push({ type: 'E', x, y, hp: 200});
      } else if (line[x] === 'G') {
        combatants.push({ type: 'G', x, y, hp: 200});
      }
    }

    y++;
  }

  return { combatants, grid };
};

const getAttackTargets = (combatant, enemies) => {
  const targets = [];

  for (let comb of enemies) {
    if (
      (comb.x === combatant.x && comb.y === combatant.y - 1) ||
      (comb.x === combatant.x && comb.y === combatant.y + 1) ||
      (comb.x === combatant.x - 1 && comb.y === combatant.y) ||
      (comb.x === combatant.x + 1 && comb.y === combatant.y)
    ) {
      targets.push(comb);
    }
  }

  return targets;
};

const combatEngine = (grid, combatants, elfAttack, exitOnElfDeath) => {
  let turnCount = 0;

  while(true) {
    combatants = combatants.sort((a, b) => (a.y * 1000 + a.x) - (b.y * 1000 + b.x)) ;
    let cIndex = 0;

    while(cIndex < combatants.length) {
      let combatant = combatants[cIndex];
      let enemies = combatants.filter(x => x.type !== combatant.type);
      if (!enemies.length) return turnCount;
      let attackTargets = getAttackTargets(combatant, enemies);

      if (!attackTargets.length) {
        let moveTargets = [];

        for (let enemy of enemies) {
          moveTargets.push({x: enemy.x - 1, y: enemy.y});
          moveTargets.push({x: enemy.x + 1, y: enemy.y});
          moveTargets.push({x: enemy.x, y: enemy.y - 1});
          moveTargets.push({x: enemy.x, y: enemy.y + 1});
        }

        let starts = [];

        starts.push({x: combatant.x, y: combatant.y - 1});
        starts.push({x: combatant.x - 1, y: combatant.y});
        starts.push({x: combatant.x + 1, y: combatant.y});
        starts.push({x: combatant.x, y: combatant.y + 1});

        let queue = [];
        for (let start of starts) {
          queue.push({start: start, position: start, visited: {}, steps: 1});
        }

        let foundSteps = Infinity;
        let foundTarget;
        let foundStart;

        pathLoop: while (queue.length) {
          let current = queue.shift();
          if (current.steps > foundSteps) break;
          let position = current.position;
          let id = position.x + ',' + position.y;
          let visited = current.visited;
          if (visited[id]) continue;
          visited[id] = true;
          if (grid[position.x][position.y]) continue;

          for (let comb2 of combatants) {
            if (comb2 !== combatant && comb2.x === position.x && comb2.y === position.y) {
              continue pathLoop;
            }
          }

          for (let moveTarget of moveTargets) {
            if (moveTarget.x === position.x && moveTarget.y === position.y) {
              if (!foundTarget || moveTarget.y < foundTarget.y || (moveTarget.y === foundTarget.y && moveTarget.x < foundTarget.x)) {
                foundSteps = current.steps;
                foundTarget = moveTarget;
                foundStart = current.start;
              }
            }
          }

          queue.push({start: current.start, visited: visited, position: {x: position.x - 1, y: position.y}, steps: current.steps + 1});
          queue.push({start: current.start, visited: visited, position: {x: position.x + 1, y: position.y}, steps: current.steps + 1});
          queue.push({start: current.start, visited: visited, position: {x: position.x, y: position.y - 1}, steps: current.steps + 1});
          queue.push({start: current.start, visited: visited, position: {x: position.x, y: position.y + 1}, steps: current.steps + 1});
        }

        if(foundStart) {
          combatant.x = foundStart.x;
          combatant.y = foundStart.y;
        }
      }

      if (!attackTargets.length) {
        attackTargets = getAttackTargets(combatant, enemies);
      }

      if (attackTargets.length) {
        attackTargets = attackTargets.sort((a ,b) => (a.hp * 100000 + a.y * 1000 + a.x) - (b.hp * 100000 + b.y * 1000 + b.x));
        let attackValue = 3;
        if (combatant.type === 'E') {
          attackValue = elfAttack;
        }
        attackTargets[0].hp -= attackValue;
        if (attackTargets[0].hp <= 0) {
          if (exitOnElfDeath && attackTargets[0].type === 'E') {
            return -1;
          }
          let foundIndex = 0;
          for(let cIndex2 = 0; cIndex2 < combatants.length; cIndex2++) {
            if (combatants[cIndex2] === attackTargets[0]) {
              foundIndex = cIndex2;
              break;
            }
          }

          combatants.splice(foundIndex, 1);
          if(foundIndex < cIndex) cIndex--;
        }
      }

      cIndex++;
    }

    turnCount++;
  }
};

const p1 = () => {
  const { combatants, grid } = parser(input);
  const turnCount = combatEngine(grid, combatants, 3, false);
  return turnCount * combatants.map(x => x.hp).reduce((a, b) => a + b);
};

const p2 = () => {
  const { combatants: originalCombatants, grid } = parser(input);

  let elfAttack = 3;
  let turnCount = 0;
  let combatants;

  while (turnCount <= 0) {
    elfAttack++;
    combatants = [];

    for(let c of originalCombatants) {
      combatants.push({ type: c.type, x: c.x, y: c.y, hp: c.hp });
    }

    turnCount = combatEngine(grid, combatants, elfAttack, true);
  }

  return turnCount * combatants.map(x => x.hp).reduce((a, b) => a + b);
};


console.log('Part one:', p1());
console.log('Part two:', p2());