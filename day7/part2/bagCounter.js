const { readLines } = require('../../fileReader')

async function main() {
    const bagRuleData = await readLines('../input');

    const bagChildren = {}
    bagRuleData.forEach((ruleLine) => {
        if (!ruleLine.length) return;
        const splitRule = ruleLine.split(' bags contain ');
        const parent = splitRule[0];
        const children = splitRule[1];
        if (children === 'no other bags.') {
            return;
        }

        const splitChildren = children.split(' bag');
        for (let i = 0; i < splitChildren.length - 1; i += 1) {
            const child = splitChildren[i];
            let trimmedChild;
            if (i === 0) {
                trimmedChild = child;
            } else {
                trimmedChild = child.substr(2).trim();
            }
            if (bagChildren[parent]) {
                bagChildren[parent].push(trimmedChild);
            } else {
                bagChildren[parent] = [trimmedChild];
            }
        }
    });

    const numberofDescendants = {};
    
    function getNumberofDescendants(parentName) {
        if (numberofDescendants[parentName]) return numberofDescendants[parentName];
        if (!bagChildren[parentName]) return 0;

        let nDescendants = 0;
        for (let i = 0; i < bagChildren[parentName].length; i += 1) {
            const child = bagChildren[parentName][i];
            const childCount = parseInt(child[0], 10);
            const childColour = child.substr(2);
            nDescendants += childCount * (1 + getNumberofDescendants(childColour));
        }
        numberofDescendants[parentName] = nDescendants;
        return nDescendants;
    }

    const initTime = Date.now();
    console.log(getNumberofDescendants('shiny gold'));
    console.log(Date.now() - initTime);
}

main();
