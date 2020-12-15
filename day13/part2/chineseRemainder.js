const { readLines } = require('../../fileReader')

async function main() {
    let buses = await readLines('../input.txt');
    const busIds = buses[1].split(',');

    let M = 1;
    for(let i = 1; i < busIds.length; i += 1) {
        if (busIds[i] === 'x') continue;
        M *= parseInt(busIds[i], 10);
    }

    console.log(M);
    let x = 0;
    for(let i = 0; i < busIds.length; i += 1) {
        if (busIds[i] === 'x') continue;
        const mi = parseInt(busIds[i], 10);
        const bi = M / mi;
        let biprime = 0;
        for (let j = 1; j < mi; j += 1) {
            if ((bi * j) % mi === 1) {
                biprime = j;
            }
        }
        x += (mi - i) * bi * biprime;
    }

    console.log(x);

    while (x % parseInt(busIds[0], 10)) {
        x += M;
    }

    console.log(x);
}

main();
