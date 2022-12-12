const fs = require('fs');
const input = fs.readFileSync('18/18.txt', 'UTF-8');

const p1 = () => {
    let lines = input.split('\n');
    let grid = [];
    for(let x = 0; x < lines[0].length; x++) {
        grid.push([]);
    }
    for(let y = 0; y < lines.length; y++) {
        for(let x = 0; x < lines[y].length; x++) {
            grid[x][y] = lines[x][y];
        }
    }

    for(let minute = 0; minute < 10; minute++) {
        let newGrid = [];
        for(let x = 0; x < grid[0].length; x++) 
        {
            newGrid.push([]);
        }

        for(let x = 0; x < grid.length; x++) {
            for(let y = 0; y < grid[x].length; y++) {
                let numTrees = 0;
                let numYards = 0;

                for(let xx = x - 1; xx <= x + 1; xx++) {
                    for(let yy = y - 1; yy <= y + 1; yy++) {
                        if(grid[xx] && grid[xx][yy] === '|') {
                            numTrees++;
                        }
                        else if(grid[xx] && grid[xx][yy] === '#') {
                            numYards++;
                        }
                    }
                }

                if(grid[x][y] === '.') {
                    if(numTrees >= 3) {
                        newGrid[x][y] = '|';
                    }
                    else {
                        newGrid[x][y] = '.';
                    }
                }
                else if(grid[x][y] === '|') {
                    if(numYards >= 3) {
                        newGrid[x][y] = '#'
                    }
                    else {
                        newGrid[x][y] = '|';
                    }
                }
                else if(grid[x][y] === '#') {
                    if(numYards >= 2 && numTrees >= 1) {
                        newGrid[x][y] = '#';
                    }
                    else {
                        newGrid[x][y] = '.';
                    }
                }
            }
        }
        grid = newGrid;
    }

    let numTrees = 0;
    let numYards = 0;
    for(let x = 0; x < grid.length; x++) {
        for(let y = 0; y < grid[x].length; y++) {
            if(grid[x][y] === '|') {
                numTrees++;
            }
            else if(grid[x][y] === '#') {
                numYards++;
            }
        }
    }

  return numTrees * numYards;
};

const p2 = () => {
    let lines = input.split('\n');
    let grid = [];
    for(let x = 0; x < lines[0].length; x++) {
        grid.push([]);
    }
    for(let y = 0; y < lines.length; y++) {
        for(let x = 0; x < lines[y].length; x++) {
            grid[x][y] = lines[x][y];
        }
    }
    
    let minute = 0;

    let found = {};

    while(true) {
        minute++;
        let newGrid = [];
        for(let x = 0; x < grid[0].length; x++) 
        {
            newGrid.push([]);
        }

        for(let x = 0; x < grid.length; x++) {
            for(let y = 0; y < grid[x].length; y++) {
                let numTrees = 0;
                let numYards = 0;

                for(let xx = x - 1; xx <= x + 1; xx++) {
                    for(let yy = y - 1; yy <= y + 1; yy++) {
                        if(grid[xx] && grid[xx][yy] === '|') {
                            numTrees++;
                        }
                        else if(grid[xx] && grid[xx][yy] === '#') {
                            numYards++;
                        }
                    }
                }

                if(grid[x][y] === '.') {
                    if(numTrees >= 3) {
                        newGrid[x][y] = '|';
                    }
                    else {
                        newGrid[x][y] = '.';
                    }
                }
                else if(grid[x][y] === '|') {
                    if(numYards >= 3) {
                        newGrid[x][y] = '#'
                    }
                    else {
                        newGrid[x][y] = '|';
                    }
                }
                else if(grid[x][y] === '#') {
                    if(numYards >= 2 && numTrees >= 1) {
                        newGrid[x][y] = '#';
                    }
                    else {
                        newGrid[x][y] = '.';
                    }
                }
            }
        }
        grid = newGrid;

        let signature = grid.map(x => x.join('')).join('');
        if(found[signature]) {
            let loopLength = minute - found[signature];
            let target = 1000000000;
            let remaining = target - minute;
            let numLoops = Math.floor(remaining / loopLength);
            let loopFinished = minute + numLoops * loopLength;
            let extraEntries = target - loopFinished;
            let targetEntry = found[signature] + extraEntries;
            let correctSignature;
            for(let sig in found) {
                if(found[sig] === targetEntry) {
                    correctSignature = sig;
                    break;
                }
            }
            let numTrees = 0;
            let numYards = 0;
            for(let char of correctSignature) {
                if(char === '|') {
                    numTrees++;
                }
                else if(char === '#') {
                    numYards++;
                }
            }
            return numTrees * numYards;
        }
        else {
            found[signature] = minute;

        }
    }
};

console.log('Part one:', p1());
console.log('Part two:', p2());