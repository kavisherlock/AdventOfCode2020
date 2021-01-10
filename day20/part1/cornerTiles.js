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
        break;
      }
    }
  });

  return neighbour;
}

const findAllNeighbours = (tiles, index) => {
  const neighbours = [];
  for (let d = 0; d < directions.length; d += 1) {
    const neighbour = findNeighbour(tiles, index, directions[d]);
    if (neighbour) {
      neighbours.push(neighbour);
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

  const corners = [];
  Object.keys(tiles).forEach(tileIndex => {
    if (findAllNeighbours(tiles, tileIndex).length === 2) corners.push(tileIndex);
  });

  console.log(corners.reduce((a, c) => a * parseInt(c, 10), 1));
}

main();