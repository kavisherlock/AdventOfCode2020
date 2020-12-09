const { readLines } = require('../../fileReader')

async function main() {
    const xmasData = await readLines('../input.txt');

    // from part 1
    const targetSum = 1038347917;
    let listStart = 0;
    let listEnd = 1;
    let curSum = parseInt(xmasData[listStart], 10) + parseInt(xmasData[listEnd], 10);
    while (curSum !== targetSum) {
        if (curSum < targetSum) {
            listEnd += 1;
            curSum += parseInt(xmasData[listEnd], 10);
        } else if (curSum > targetSum) {
            curSum -= parseInt(xmasData[listStart], 10);
            listStart += 1;
            if (listStart === listEnd) {
                listEnd += 1;
                curSum += parseInt(xmasData[listEnd], 10);
            }
        }
    }
    let minVal = -1;
    let maxVal = -1;
    for (let i = listStart; i <= listEnd; i += 1) {
        const curNumber = parseInt(xmasData[i], 10);
        if (curNumber < minVal || minVal === -1) {
            minVal = curNumber;
        }
        if (curNumber > maxVal || maxVal === -1) {
            maxVal = curNumber;
        }
    }
    console.log(maxVal + minVal);
}

main();
