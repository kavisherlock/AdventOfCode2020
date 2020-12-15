const { readLines } = require('../../fileReader')

async function main() {
    let buses = await readLines('../input.txt');
    const busIds = buses[1].split(',');

    let inputString = '';
    let l = 0;
    for(let i = 0; i < busIds.length; i += 1) {
        if (busIds[i] === 'x') continue;
        inputString += `x = ${parseInt(busIds[i], 10)}${String.fromCharCode(l + 97)} - ${i}, `;
        l += 1;
    }
    console.log(inputString);
    console.log(`Enter the above as an input to Wolfram Alpha.
    The integer solution will be in the form of x = Mn + C
    Your answer is C
    If too many equations for Wolfram Alpha to handle, put in half the equaltions as input,
    get the integer solution so far and use it as one of the equations with the other half as input`)
}

main();
