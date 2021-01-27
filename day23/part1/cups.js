const input = '716892543';
const testinput = '389125467';

const pickUpCups = (cups, curCupIndex) => {
  const pickedUpCups = [];
  const pickedUpIndices = [];
  let cupIndex = (curCupIndex + 1) % cups.length;
  for (let i = 0; i < 3; i += 1) {
    pickedUpCups.push(cups[cupIndex]);
    pickedUpIndices.push(cupIndex);
    cupIndex = (cupIndex + 1) % cups.length
  }

  const leftoverCups = [];
  for (let i = 0; i < cups.length; i += 1) {
    if (!pickedUpIndices.includes(i)) leftoverCups.push(cups[i]);
  }

  return [pickedUpCups, leftoverCups];
}

const getDesinationCupIndex = (cups, curCup) => {
  let destCup = curCup - 1;
  let destCupIndex = cups.findIndex(c => c === destCup);
  while (destCupIndex === -1) {
    destCup = destCup - 1;
    if (destCup < 1) {
      destCup = Math.max(...cups);
    }
    destCupIndex = cups.findIndex(c => c === destCup);
  }

  return destCupIndex;
}

const move = (inputCups, curCupIndex) => {
  const curCup = inputCups[curCupIndex];
  const [pickedUpCups, leftoverCups] = pickUpCups(inputCups, curCupIndex);
  const destinationCupIndex = getDesinationCupIndex(leftoverCups, curCup);

  return [leftoverCups.slice(0, destinationCupIndex + 1).concat(pickedUpCups).concat(leftoverCups.slice(destinationCupIndex + 1)), curCup];
}

const performMoves = (cupInput, nMoves) => {
  let output = cupInput.split('').map(c => parseInt(c, 10));
  let curCupIndex = 0;
  for (let i = 0; i < nMoves; i += 1) {
    [output, curCup] = move(output, curCupIndex);
    curCupIndex = (output.findIndex(c => c === curCup) + 1) % cupInput.length
  }

  console.log(output.join(''));
}

performMoves(input, 100);
