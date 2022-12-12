const fs = require('fs');
const input = fs.readFileSync('23/23.txt', 'UTF-8');

const p1 = () => {
    let lines = input.split('\n');
    let bots = [];
    let strongBot = {range:0};
    for(let line of lines) {
        let parsed = /pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(\d+)/.exec(line);
        let newBot = {x: +parsed[1], y: +parsed[2], z: +parsed[3], range: +parsed[4]};
        bots.push(newBot);
        if(newBot.range > strongBot.range) {
            strongBot = newBot;
        }
    }

    let count = 0;
    for(let bot of bots) {
        let distance = Math.abs(bot.x - strongBot.x) + Math.abs(bot.y - strongBot.y) + Math.abs(bot.z - strongBot.z);
        if(distance <= strongBot.range) {
            count++;
        }
    }

    return count;
};

const p2 = () => {
  let { PriorityQueue } = require('@datastructures-js/priority-queue');

    let lines = input.split('\n');
    let bots = [];
    for(let line of lines) {
        let parsed = /pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(\d+)/.exec(line);
        let newBot = {x: +parsed[1], y: +parsed[2], z: +parsed[3], range: +parsed[4]};
        bots.push(newBot);
    }

    let minX = Math.min(...bots.map(b => b.x), 0);
    let maxX = Math.max(...bots.map(b => b.x), 0);
    let minY = Math.min(...bots.map(b => b.y), 0);
    let maxY = Math.max(...bots.map(b => b.y), 0);
    let minZ = Math.min(...bots.map(b => b.z), 0);
    let maxZ = Math.max(...bots.map(b => b.z), 0);
    let maxCoordinate = Math.max(...[minX, maxX, minY, maxY, minZ, maxZ].map(Math.abs));

    let searchDistance = 1;
    while(searchDistance < maxCoordinate) {
        searchDistance *= 2;
    }

    let queue = new PriorityQueue((a, b) => b.numBots - a.numBots || b.searchSize - a.searchSize || a.distance - b.distance);
    queue.enqueue({
        numBots: bots.length,
        searchSize: 2 * searchDistance,
        distance: 3 * searchDistance,
        minX: -searchDistance,
        minY: -searchDistance,
        minZ: -searchDistance,
    });

    let deltas = [];

    for(let x of [0, 1]) {
        for(let y of [0, 1]) {
            for(let z of [0, 1]) {
                deltas.push({x, y, z});
            }
        }
    }

    while(!queue.isEmpty()) {
        let current = queue.dequeue();

        if(current.searchSize === 1) {
            return current.distance;
        }

        let newSize = current.searchSize / 2;

        for(let delta of deltas) {
            let minX = current.minX + newSize * delta.x;
            let minY = current.minY + newSize * delta.y;
            let minZ = current.minZ + newSize * delta.z;
            let maxX = minX + newSize - 1;
            let maxY = minY + newSize - 1;
            let maxZ = minZ + newSize - 1;

            let numBots = bots.filter(bot => {
                let distance = 0;
                if(bot.x < minX) {
                    distance += minX - bot.x;
                }
                else if(bot.x > maxX) {
                    distance += bot.x - maxX;
                }
                if(bot.y < minY) {
                    distance += minY - bot.y;
                }
                else if(bot.y > maxY) {
                    distance += bot.y - maxY;
                }
                if(bot.z < minZ) {
                    distance += minZ - bot.z;
                }
                else if(bot.z > maxZ) {
                    distance += bot.z - maxZ;
                }
                return (distance <= bot.range);
            }).length;

            let distance = Math.abs(minX) + Math.abs(minY) + Math.abs(minZ);

            queue.enqueue({
                numBots,
                searchSize: newSize,
                distance,
                minX,
                minY,
                minZ,
            })
        }
    }
};

console.log('Part one:', p1());
console.log('Part two:', p2());
