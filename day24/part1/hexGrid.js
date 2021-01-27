const { readLines } = require('../../fileReader');

async function main() {
  const hexGridData = await readLines('../input.txt');

  const tiles = {};
  hexGridData.forEach(line => {
    let curX = 0;
    let curY = 0;
    for (let i = 0; i < line.length; i += 1) {
      let step = line[i];
      if (step === 'e') {
        curX += 2;
      } else if (step === 'w') {
        curX -= 2;
      } else if (step === 'n') {
        curY += 1;
        curX = curX + (line[i + 1] === 'e' ? 1 : (-1));
        i += 1;
      } else {
        curY -= 1;
        curX = curX + (line[i + 1] === 'e' ? 1 : (-1));
        i += 1;
      }
    }

    tiles[`${curX} ${curY}`] = tiles[`${curX} ${curY}`] === 'b' ? 'w' : 'b';
  });

  console.table(Object.keys(tiles).filter(key => tiles[key] === 'b').length);
}

main();
