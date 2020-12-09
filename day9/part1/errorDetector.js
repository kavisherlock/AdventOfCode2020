const { readLines } = require('../../fileReader')

async function main() {
    const xmasData = await readLines('../input.txt');
    const nTotal = xmasData.length;
    let curPreamble = xmasData.slice(0, 25).map((a) => parseInt(a, 10));

    for(let curIndex = 25; curIndex < nTotal; curIndex += 1) {
        const curNumber = parseInt(xmasData[curIndex], 10);
        let sumFound = false;
        for(let i = 0; i < 25; i += 1) {
            for(let j = 0; j < 25; j += 1) {
                if (i !== j && curPreamble[i] + curPreamble[j] === curNumber) {
                    sumFound = true;
                    break;
                }
            }
            if (sumFound) break;
        }
        
        if (!sumFound) {
            console.log(curNumber);
            return;
        }

        curPreamble = curPreamble.slice(1, 25).concat(curNumber);
    }
}

main();
