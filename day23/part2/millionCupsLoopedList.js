const { LoopedList } = require('looped-list');

const input = '716892543';
const testinput = '389125467';
const NCUPS = 1000000;
const NMOVES = 10000000;

const initTime = Date.now();

let cupList = new LoopedList(parseInt(input[0], 10));
input.split('').slice(1).forEach(c => cupList.insertNext(parseInt(c, 10)));
for (let i = 10; i <= NCUPS; i += 1) {
  cupList.insertNext(i);
}
cupList.move(1);

const lookup = Array(NCUPS + 1);
for (let item of cupList.items()) {
  lookup[item.value] = item;
}

for (let i = 0; i < NMOVES; i += 1) {
  const curCupValue = cupList.head.value;
  cupList.move();
  const cup1 = cupList.popHeadMoveNext();
  const cup2 = cupList.popHeadMoveNext();
  const cup3 = cupList.popHeadMoveNext();
  const pickedUpCups = [cup1.value, cup2.value, cup3.value];
  
  let destCupValue = curCupValue - 1 === 0 ? NCUPS : curCupValue - 1;
  while (pickedUpCups.includes(destCupValue)) {
    destCupValue = destCupValue - 1 === 0 ? NCUPS : destCupValue - 1;
  }

  cupList.setHead(lookup[destCupValue]);

  cupList.insertNext(cup1);
  cupList.insertNext(cup2);
  cupList.insertNext(cup3);

  cupList.setHead(lookup[curCupValue]);
  cupList.move(1);
}

console.log(lookup[1].next(1).value * lookup[1].next(2).value);
console.log(`Took ${(Date.now() - initTime) / 1000} seconds`);
