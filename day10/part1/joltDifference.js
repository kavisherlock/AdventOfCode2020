const { readLines } = require('../../fileReader')

async function main() {
    let joltData = await readLines('../input.txt');
    joltData = joltData.map(a => parseInt(a, 10));

    const maxJoltage = Math.max(...joltData);
    const builtIn = maxJoltage + 3;
    const joltages = new Array(builtIn + 1);
    joltages[0] = 1;
    joltages[builtIn] = 1;
    joltData.forEach(j => { joltages[j] = 1 });

    let n1diff = 0;
    let n3diff = 0;
    for (let i = 0; i < joltages.length - 1; i += 1) {
        if (joltages[i] && joltages[i + 1]) {
            n1diff += 1;
        } else if ((i + 3) < joltages.length && joltages[i] && joltages[i + 3]) {
            n3diff += 1;
        }
    }

    console.log(n1diff * n3diff);
}

main();
