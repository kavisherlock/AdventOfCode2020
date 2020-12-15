const { readLines } = require('../../fileReader')

async function main() {
    let buses = await readLines('../input.txt');
    const timestamp = buses[0];
    const busIds = buses[1].split(',').filter((id) => id != 'x');
    let closestBusId = -1;
    busIds.forEach((id) => {
        if (closestBusId === -1 || (id - (timestamp % id)) < (closestBusId - (timestamp % closestBusId))) {
            closestBusId = id;
        }
    });

    console.log(closestBusId * ((closestBusId - (timestamp % closestBusId))));
}

main();
