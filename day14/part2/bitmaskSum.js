const { readLines } = require('../../fileReader')
const BITMASK_LENGTH = 36;

function getBitmaskedValue (val, bitmask) {
    let bitmaskedValue = '';
    for (let i = 0; i < BITMASK_LENGTH; i += 1) {
        bitmaskedValue += bitmask[i] === '0' ? val[i] : bitmask[i];
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
            const memAddress = parseInt(lineEquation[0].substr(4, lineEquation[0].length - 5), 10);
            const value = parseInt(lineEquation[1].trim(), 10);
            const memAddressBin = "0".repeat(BITMASK_LENGTH - memAddress.toString(2).length) + memAddress.toString(2)
            const floatingMemAddress = getBitmaskedValue(memAddressBin, curBitmask);
            const floatCount = floatingMemAddress.split('').filter(x => x === 'X').length;
            for (let i = 0; i < 2 ** floatCount; i += 1) {
                let floatsEncountered = 0;
                let floatValues = "0".repeat(floatCount - i.toString(2).length) + i.toString(2);
                let address = '';
                for (let i = 0; i < BITMASK_LENGTH; i += 1) {
                    if (floatingMemAddress[i] === 'X') {
                        address += floatValues[floatsEncountered];
                        floatsEncountered += 1;
                    } else {
                        address += floatingMemAddress[i];
                    }
                }
                memory[address] = value;
            }
        }
    });

    console.log(Object.values(memory).reduce((a, c) => a + c));
}

main();
