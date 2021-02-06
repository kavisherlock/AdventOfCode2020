const { readLines } = require('../../fileReader');

const directions = ['up', 'down', 'left', 'right'];

const getTileEdge = (tile, direction) => {
  switch (direction) {
    case 'up': return tile[0];
    case 'down': return tile[tile.length - 1];
    case 'left': return tile.reduce((a, c) => a + c[0], '');
    case 'right': return tile.reduce((a, c) => a + c[c.length - 1], '');
    default: return '';
  }
}

const findNeighbour = (tiles, index, direction) => {
  const tile = tiles[index];
  let neighbour;
  let flipped = false;
  const edgeToMatch = getTileEdge(tile, direction);

  Object.entries(tiles).forEach(([tileIndex, tileToCheck]) => {
    if (tileIndex === index || neighbour) return;

    for (let d = 0; d < directions.length; d += 1) {
      const directionToCheck = directions[d];
      const edgeToCheck = getTileEdge(tileToCheck, directionToCheck);
      
      if (!edgeToCheck) {
        console.log(tileIndex, tileToCheck, directionToCheck);
      }

      if (edgeToCheck === edgeToMatch || edgeToCheck.split('').reverse().join('') === edgeToMatch) {
        neighbour = tileIndex;
        if (edgeToCheck.split('').reverse().join('') === edgeToMatch) {
          flipped = true;
        }
        break;
      }
    }
  });

  return [neighbour, flipped];
}

const findAllNeighbours = (tiles, index) => {
  const neighbours = [];
  for (let d = 0; d < directions.length; d += 1) {
    const [neighbour, flipped] = findNeighbour(tiles, index, directions[d]);
    if (neighbour) {
      neighbours.push({ tile: neighbour, dir: directions[d], flipped });
    }
  }
  return neighbours;
}

async function main() {
  const cameraData = await readLines('../input.txt');
  const tiles = {};
  let curTile = [];
  let curTileNumber;

  for (let i = 0; i < cameraData.length; i += 1) {
    if (!cameraData[i].trim() || cameraData[i] === '\n') {
      tiles[curTileNumber] = curTile;
      curTileNumber = null;
      curTile = [];
    } else if (cameraData[i].includes('Tile')) {
      curTileNumber = cameraData[i].substr(5, 4);
    } else {
      curTile.push(cameraData[i].trim())
    }
  }
  if (curTileNumber) tiles[curTileNumber] = curTile;

  // let topLeftTileIndex;
  // const tileIndices = Object.keys(tiles);
  // for (let i = 0; i < tileIndices.length; i += 1) {
  //   const tileIndex = tileIndices[i];
  //   const neighbourDirections = findAllNeighbours(tiles, tileIndex).map(n => n.dir);
  //   if (!neighbourDirections.includes('up') && !neighbourDirections.includes('left')) {
  //     topLeftTileIndex = tileIndex
  //   }
  // }

  // console.log(topLeftTileIndex);

  // const neighbours = {};
  // tileIndices.forEach(tileIndex => {
  //   neighbours[tileIndex] = findAllNeighbours(tiles, tileIndex);
  // });
  // console.table(neighbours);

  const nSeaMonsterPixels = 15;

  let nBlack = 0;
  Object.values(tiles).forEach((tile) => {
    for (let i = 1; i < tile.length - 1; i += 1) {
      for (let j = 1; j < tile[0].length - 1; j += 1) {
        if (tile[i][j] === '#') nBlack += 1;
      }
    }
  });
  
  const nSeaMonsters = 26; // LITERAL TRIAL AND ERROR LOLOLOL
  console.log(nBlack - (nSeaMonsters * nSeaMonsterPixels));
}

main();