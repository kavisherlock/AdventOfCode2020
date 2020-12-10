const { readLines } = require('../../fileReader')

async function main() {
    let joltData = await readLines('../input.txt');
    joltData = joltData.map(a => parseInt(a, 10));

    const maxJoltage = Math.max(...joltData);
    const builtIn = maxJoltage + 3;
    const joltages = new Array(builtIn + 1);
    joltages[0] = 0;
    joltages[builtIn] = 1;
    joltData.forEach(j => { joltages[j] = 0 });

    for (i = joltages.length - 1; i >= 0; i -= 1) {
        if (joltages[i] === undefined) continue;
        if (i - 1 >= 0 && joltages[i - 1] !== undefined) joltages[i - 1] += joltages[i];
        if (i - 2 >= 0 && joltages[i - 2] !== undefined) joltages[i - 2] += joltages[i];
        if (i - 3 >= 0 && joltages[i - 3] !== undefined) joltages[i - 3] += joltages[i];
    }
    console.log(joltages[0]);
}

main();
