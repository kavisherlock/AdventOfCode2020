const input = '19,0,5,1,10,13';

const startingNumbers = input.split(',');
let startingNumbersLeft = startingNumbers.length;
const spokenNumbers = {};
let lastSpokenNumber = -1;

for (let i = 1; i <= 2020; i += 1) {
    const prevLastNumberSpoken = lastSpokenNumber;
    if (startingNumbersLeft > 0) {
        if (startingNumbersLeft > 1)
            spokenNumbers[startingNumbers[i - 1]] = i;
        startingNumbersLeft -= 1;
        lastSpokenNumber = startingNumbers[i - 1];
    } else {
        if (spokenNumbers[lastSpokenNumber]) {
            lastSpokenNumber = i - 1 - spokenNumbers[lastSpokenNumber];
            spokenNumbers[prevLastNumberSpoken] = i - 1;
        } else {
            spokenNumbers[lastSpokenNumber] = i - 1;
            lastSpokenNumber = 0;
        }
    }
}

console.log(lastSpokenNumber);

