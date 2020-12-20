const { readLines } = require('../../fileReader')

const N_CYCLES = 6;

const isCubeActive = (cubes, x, y, z, w) => {
  const nRows = cubes[0][0][0].length;
  const nCols = cubes[0][0].length;
  const nSlices = cubes[0].length;
  const nBlocks = cubes.length;

  return x >= 0 && x < nRows && y >= 0 && y < nCols && z >= 0 && z < nSlices && w >= 0 && w < nBlocks && cubes[w][z][y][x] === '#';
}

const countActiveAdjacentCubes = (cubes, x, y, z, w) => {
  let emptyCubes = 0;

  for (let i = -1; i <= 1; i += 1) {
    for (let j = -1; j <= 1; j += 1) {
      for (let k = -1; k <= 1; k += 1) {
        for (let l = -1; l <= 1; l += 1) {
          if (i === 0 && j === 0 && k === 0 && l === 0) continue;

          if (isCubeActive(cubes, x + i, y + j, z + k, w + l)) emptyCubes += 1;
        }
      }
    }
  }

  return emptyCubes;
}

async function main() {
  const initialSlice = await readLines('../input.txt');
  const N_CUBES = 1 + 2 * N_CYCLES;
  const N_SLICES = 1 + 2 * N_CYCLES;
  const N_COLUMNS = initialSlice[0].length + 2 * N_CYCLES;
  const N_ROWS = initialSlice.length + 2 * N_CYCLES;

  const initTime = Date.now();

  let prevConwayHypercube = new Array(N_CUBES);
  let curConwayHypercube = new Array(N_CUBES);
  for (let w = 0; w < N_CUBES; w += 1) {
    const prevConwayBlock = new Array(N_SLICES);
    const curConwayBlock = new Array(N_SLICES);
    for (let z = 0; z < N_SLICES; z += 1) {
      const prevConwayColumn = new Array(N_COLUMNS);
      const curConwayColumn = new Array(N_COLUMNS);
      for (let y = 0; y < N_COLUMNS; y += 1) {
        const prevConwayRow = new Array(N_ROWS);;
        const curConwayRow = new Array(N_ROWS);
        for (let x = 0; x < N_ROWS; x += 1) {
          if (x >= N_CYCLES && x < N_CYCLES + initialSlice.length
            && y >= N_CYCLES && y < N_CYCLES + initialSlice.length
            && z === N_CYCLES
            && w === N_CYCLES
          ) {
            prevConwayRow[x] = initialSlice[y - N_CYCLES][x - N_CYCLES].trim();
          } else {
            prevConwayRow[x] = '.';
          }
          curConwayRow[x] = '.';
        }
        prevConwayColumn[y] = prevConwayRow;
        curConwayColumn[y] = curConwayRow;
      }
      prevConwayBlock[z] = prevConwayColumn;
      curConwayBlock[z] = curConwayColumn;
    }
    prevConwayHypercube[w] = prevConwayBlock;
    curConwayHypercube[w] = curConwayBlock;
  }

  let activeCubes = 0;
  for (let i = 0; i < N_CYCLES; i += 1) {
    activeCubes = 0;
    for (let w = 0; w < N_CUBES; w += 1) {
      for (let z = 0; z < N_SLICES; z += 1) {
        for (let y = 0; y < N_COLUMNS; y += 1) {
          for (let x = 0; x < N_ROWS; x += 1) {
            const activeAdjecentCubes = countActiveAdjacentCubes(prevConwayHypercube, x, y, z, w);
            if (prevConwayHypercube[w][z][y][x] === '#') {
              if (activeAdjecentCubes === 2 || activeAdjecentCubes === 3) {
                curConwayHypercube[w][z][y][x] = '#';
                activeCubes += 1;
              } else {
                curConwayHypercube[w][z][y][x] = '.';
              }
            } else {
              if (activeAdjecentCubes === 3) {
                curConwayHypercube[w][z][y][x] = '#';
                activeCubes += 1;
              } else {
                curConwayHypercube[w][z][y][x] = '.';
              }
            }
          }
        }
      }
    }

    for (let w = 0; w < N_CUBES; w += 1) {
      for (let z = 0; z < N_SLICES; z += 1) {
        for (let y = 0; y < N_COLUMNS; y += 1) {
          for (let x = 0; x < N_ROWS; x += 1) {
            prevConwayHypercube[w][z][y][x] = curConwayHypercube[w][z][y][x];
          }
        }
      }
    }
  }

  console.log(activeCubes);
  console.log('Time:', Date.now() - initTime);
}

main();