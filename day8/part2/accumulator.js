const { readLines } = require('../../fileReader')

async function main() {
    const instructions = await readLines('../input');
    const nInstructions = instructions.length;


    let instructionVisited = new Array(nInstructions);
    let curInsturctionN = 0;
    let instructionToChange = 0;
    let accumulator = 0;
    while (curInsturctionN < nInstructions) {
        if (instructionVisited[curInsturctionN]) {
            curInsturctionN = 0;
            accumulator = 0;
            instructionToChange += 1;
            instructionVisited = new Array(nInstructions);
        }
        
        const instruction = instructions[curInsturctionN];
        let [command, value] = instruction.split(' ');
        const intValue = parseInt(value, 10);
        instructionVisited[curInsturctionN] = 1;

        if (instructionToChange === curInsturctionN) {
            if (command === 'nop') {
                command = 'jmp';
            } else if (command === 'jmp') {
                command = 'nop';
            } else {
                curInsturctionN = 0;
                accumulator = 0;
                instructionToChange += 1;
                instructionVisited = new Array(nInstructions);
                continue;
            }
        }

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
