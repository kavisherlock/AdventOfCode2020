const { readLines } = require('../../fileReader')

async function main() {
    const instructions = await readLines('../input');
    const nInstructions = instructions.length;
    
    const instructionVisited = new Array(nInstructions);
    let curInsturctionN = 0;
    let accumulator = 0;
    while (!instructionVisited[curInsturctionN]) {
        const instruction = instructions[curInsturctionN];
        const [command, value] = instruction.split(' ');
        const intValue = parseInt(value, 10);
        instructionVisited[curInsturctionN] = 1;

        if (command === 'nop') {
            curInsturctionN += 1;
        } else if (command === 'acc') {
            accumulator += intValue;
            curInsturctionN += 1;
        } else if (command === 'jmp') {
            curInsturctionN += intValue;
        }

    }
    console.log(accumulator);
}

main();
