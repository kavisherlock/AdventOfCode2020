const input = '716892543';
const testinput = '389125467';

const NCUPS = 1000000;

let pickUpCupsTime = 0;
let getDesinationCupIndexTime = 0;
let sliceAndConcatTime = 0;

const pickUpCups = (cups, curCupIndex) => {
  const pickedUpCups = [];
  const pickedUpIndices = [];
  let cupIndex = (curCupIndex + 1) % NCUPS;
  for (let i = 0; i < 3; i += 1) {
    pickedUpCups.push(cups[cupIndex]);
    pickedUpIndices.push(cupIndex);
    cupIndex = (cupIndex + 1) % NCUPS
  }

  const leftoverCups = new Array(NCUPS - 4);
  let li = 0;
  for (let i = 0; i < NCUPS; i += 1) {
    if (!pickedUpIndices.includes(i)) {
      leftoverCups[li] = cups[i];
      li += 1;
    }
  }

  return [pickedUpCups, leftoverCups];
}

const getDesinationCupIndex = (cups, curCup, pickedUpCups) => {
  let destCup = curCup - 1;
  let destCupIndex = cups.findIndex(c => c === destCup);
  while (destCupIndex === -1) {
    destCup = destCup - 1;
    if (destCup < 1) {
      destCup = NCUPS;
      while (pickedUpCups.includes(destCup)) {
        destCup -= 1;
      }
    }
    destCupIndex = cups.findIndex(c => c === destCup);
  }

  return destCupIndex;
}

const move = (inputCups, curCupIndex) => {
  const curCup = inputCups[curCupIndex];
  const initTime = Date.now();
  const [pickedUpCups, leftoverCups] = pickUpCups(inputCups, curCupIndex);
  pickUpCupsTime += Date.now() - initTime;
  const initTime2 = Date.now();
  const destinationCupIndex = getDesinationCupIndex(leftoverCups, curCup, pickedUpCups);
  getDesinationCupIndexTime += Date.now() - initTime2;
  
  const initTime3 = Date.now();
  const outputCups = leftoverCups.slice(0, destinationCupIndex + 1).concat(pickedUpCups).concat(leftoverCups.slice(destinationCupIndex + 1));
  sliceAndConcatTime += Date.now() - initTime3

  return [outputCups, curCup];
}

const performMoves = (cupInput, nMoves) => {
  let output = cupInput.split('').map(c => parseInt(c, 10));
  for (let i = 10; i < NCUPS; i += 1) {
    output.push(i);
  }
  let curCupIndex = 0;
  for (let i = 0; i < nMoves; i += 1) {
    [output, curCup] = move(output, curCupIndex);
    curCupIndex = (output.findIndex(c => c === curCup) + 1) % NCUPS
  }

  const oneIndex = output.findIndex(c => c === 1);
  console.log(oneIndex, output[(oneIndex + 1) % NCUPS], output[(oneIndex + 2) % NCUPS]);
}

const initTime = Date.now();
performMoves(input, 100);
console.log(`Took ${(Date.now() - initTime) / 1000} seconds`)
console.log(`pickUpCups took ${pickUpCupsTime / 1000} seconds`)
console.log(`getDesinationCupIndex took ${getDesinationCupIndexTime / 1000} seconds`)
console.log(`slice and concat took ${sliceAndConcatTime / 1000} seconds`)
