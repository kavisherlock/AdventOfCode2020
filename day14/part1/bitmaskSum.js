const { readLines } = require('../../fileReader')
const BITMASK_LENGTH = 36;

function getBitmaskedValue (val, bitmask) {
    let bitmaskedValue = '';
    for (let i = 0; i < BITMASK_LENGTH; i += 1) {
        bitmaskedValue += bitmask[i] === 'X' ? val[i] : bitmask[i];
    }
    return bitmaskedValue;
}

async function main() {
    let ferryData = await readLines('../input.txt');
    const memory = {};
    let curBitmask = 'X'.repeat(BITMASK_LENGTH);
    ferryData.forEach((line) => {
        const lineEquation = line.split(' = ');
        if (lineEquation[0] === 'mask') {
            curBitmask = lineEquation[1];
        } else {
            const memAddress = lineEquation[0].substr(4, lineEquation[0].length - 5);
            const value = parseInt(lineEquation[1].trim(), 10);
            const valueBin = "0".repeat(BITMASK_LENGTH - value.toString(2).length) + value.toString(2)
            memory[memAddress] = getBitmaskedValue(valueBin, curBitmask);
        }
    });

    sum = 0;
    Object.values(memory).forEach((val) => {
        sum += parseInt(val, 2);
    });
    console.log(sum);
}

main();
