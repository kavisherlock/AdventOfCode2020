const { readLines } = require('../../fileReader')

async function main() {
    let navInstructions = await readLines('../input.txt');
    let curX = 0;
    let curY = 0;
    let waypointX = 10;
    let waypointY = 1;

    navInstructions.forEach((instruction) => {
        const action = instruction[0];
        const value =  parseInt(instruction.substr(1), 10);

        if (action === 'F') {
            curX += (waypointX * value);
            curY += (waypointY * value);
            return;
        }

        if (action === 'L' || action === 'R') {
            for (let i = 0; i < value / 90; i += 1) {
                const temp = waypointX;
                if (action === 'L') {
                    waypointX = -1 * waypointY;
                    waypointY = temp;
                } else {
                    waypointX = waypointY;
                    waypointY = -1 * temp;
                }
            }
            return;
        }

        switch(action) {
            case 'N': waypointY += value; break;
            case 'S': waypointY -= value; break;
            case 'E': waypointX += value; break;
            case 'W': waypointX -= value; break;
        }
    });

    console.log(curX, curY, Math.abs(curX) + Math.abs(curY));
}

main();