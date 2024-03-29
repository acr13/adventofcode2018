const fs = require('fs');
const input = fs.readFileSync('25/25.txt', 'UTF-8');

const p1 = () => {
    let lines = input.split('\n');
    let constellations = [];
    for(let line of lines) {
        let values = line.split(',').map(x => +x);

        let parent;
        let conIndex = 0;
        conLoop: while(conIndex < constellations.length) {
            c = constellations[conIndex];
            for(let point of c) {
                let distance = Math.abs(point[0] - values[0]) + Math.abs(point[1] - values[1]) + Math.abs(point[2] - values[2]) + Math.abs(point[3] - values[3]);

                if(distance <= 3) {
                    if(parent) {
                        parent.push(...c);
                        constellations.splice(conIndex, 1);
                    }
                    else {
                        parent = c;
                        parent.push(values);
                        conIndex++;
                    }
                    continue conLoop;
                }
            }

            conIndex++;
        }

        if(!parent) {
            constellations.push([values]);
        }
    }

    return constellations.length;
};

console.log('Part one:', p1());
