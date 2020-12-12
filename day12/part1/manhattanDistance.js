const { readLines } = require('../../fileReader')

async function main() {
    let navInstructions = await readLines('../input.txt');
    const directions = ['E', 'S', 'W', 'N'];
    let curDirIndex = 0;
    let curX = 0;
    let curY = 0;

    navInstructions.forEach((instruction) => {
        const action = instruction[0];
        const value =  parseInt(instruction.substr(1), 10);
        console.log(action, value, curDirIndex, curX, curY);

        if (action === 'L' || action === 'R') {
            if (action === 'L') {
                curDirIndex = ((360 + (curDirIndex * 90) - value) % 360) / 90;
            } else {
                curDirIndex = ((360 + (curDirIndex * 90) + value) % 360) / 90;
            }
            return;
        }

        const directionToMove = action === 'F' ? directions[curDirIndex] : action;
        switch(directionToMove) {
            case 'N': curY += value; break;
            case 'S': curY -= value; break;
            case 'E': curX += value; break;
            case 'W': curX -= value; break;
        }
    });

    console.log(curX, curY, Math.abs(curX) + Math.abs(curY));
}

main();