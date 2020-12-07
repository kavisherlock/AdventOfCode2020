const { readLines } = require('../../fileReader')

async function main() {
    const bagRuleData = await readLines('../input');

    const bagParents = {}
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
            trimmedChild = trimmedChild.substr(2);
            if (bagParents[trimmedChild]) {
                bagParents[trimmedChild].push(parent);
            } else {
                bagParents[trimmedChild] = [parent];
            }
        }
    });
    
    const ancestorSet = new Set();
    function getNumberofAncestors(childName) {
        if (ancestorSet.has(childName)) {
            return;
        }
        ancestorSet.add(childName)
        if (!bagParents[childName]) return;
        for (let i = 0; i < bagParents[childName].length; i += 1) {
            getNumberofAncestors(bagParents[childName][i])
        }
    }

    getNumberofAncestors('shiny gold');
    console.log(ancestorSet.size - 1);
}

main();
