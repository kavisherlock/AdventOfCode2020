const { readLines } = require('../../fileReader');

const getTileNeighbourCoordinates = (x, y) => {
  return [`${x + 2} ${y}`, `${x + 1} ${y - 1}`, `${x - 1} ${y - 1}`, `${x - 2} ${y}`, `${x - 1} ${y + 1}`, `${x + 1} ${y + 1}`];
};

const getAdjacentBlackTiles = (tiles, x, y) => {
  return getTileNeighbourCoordinates(x, y).filter(c => tiles[c] === 'b').length;
}

async function main() {
  const hexGridData = await readLines('../input.txt');

  const tiles = {};
  hexGridData.forEach(line => {
    let curX = 0;
    let curY = 0;
    for (let i = 0; i < line.length; i += 1) {
      let step = line[i];
      if (step === 'e') curX += 2;
      else if (step === 'w') curX -= 2;
      else {
        curY = curY + (line[i] === 'n' ? 1 : (-1));
        curX = curX + (line[i + 1] === 'e' ? 1 : (-1));
        i += 1;
      }
    }

    tiles[`${curX} ${curY}`] = tiles[`${curX} ${curY}`] === 'b' ? 'w' : 'b';
  });

  const nDays = 100;
  for (let i = 0; i < nDays; i += 1) {
    const blackTiles = Object.keys(tiles).filter(key => tiles[key] === 'b');
    const newBlackTiles = new Set();
    const newWhiteTiles = new Set();

    blackTiles.forEach(tile => {
      const [tileX, tileY] = tile.split(' ').map(x => parseInt(x, 10));
      const nAdjacentBlackTiles = getAdjacentBlackTiles(tiles, tileX, tileY);
      if (nAdjacentBlackTiles === 0 || nAdjacentBlackTiles > 2) newWhiteTiles.add(`${tileX} ${tileY}`);

      const whiteNeighbours = getTileNeighbourCoordinates(tileX, tileY).filter(c => tile[c] !== 'b');
      whiteNeighbours.forEach(c => {
        const [tx, ty] = c.split(' ').map(x => parseInt(x, 10));
        if (getAdjacentBlackTiles(tiles, tx, ty) === 2) newBlackTiles.add(c);
      });
    });
    
    Array.from(newBlackTiles).forEach(c => { tiles[c] = 'b' });
    Array.from(newWhiteTiles).forEach(c => { tiles[c] = 'w' });
  }

  console.log(Object.keys(tiles).filter(key => tiles[key] === 'b').length);
}

main();
